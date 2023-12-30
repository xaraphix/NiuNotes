use lazy_static::lazy_static;

use atomic_float::AtomicF32;
use oboe::{
    AudioDeviceDirection, AudioDeviceInfo, AudioFeature, AudioInputCallback, AudioInputStream,
    AudioInputStreamSafe, AudioOutputCallback, AudioOutputStream, AudioOutputStreamSafe,
    AudioStream, AudioStreamAsync, AudioStreamBase, AudioStreamBuilder, DataCallbackResult,
    DefaultStreamValues, Input, Mono, PerformanceMode, SharingMode, Stereo,
};
use std::f32::consts::PI;
use std::marker::PhantomData;
use std::sync::Mutex;
use std::time::{Duration, Instant, SystemTime, UNIX_EPOCH};
use std::{sync::atomic::Ordering, sync::mpsc, sync::Arc, sync::RwLock, thread};

use crate::frequency;

lazy_static! {
    pub static ref CIRCULAR_BUFFER: Arc<RwLock<AudioBuffer>> =
        Arc::new(RwLock::new(AudioBuffer::new()));
    pub static ref CALCULATED_NOTE: RwLock<String> = RwLock::new("C0;00.00".to_string());
}
const SAMPLE_RATE: i32 = 44100;
const BUFFER_SIZE: i32 = 4096;

static mut BUFFER_WRITE_SENDER: Option<Mutex<mpsc::Sender<Vec<f32>>>> = None;
#[derive(Default)]
pub struct AudioRecord {
    stream: Option<AudioStreamAsync<Input, InputRecorder<f32, Mono>>>,
}

impl AudioRecord {
    pub fn try_start(&mut self) -> String {
        if self.stream.is_none() {
            let mut stream = AudioStreamBuilder::default()
                .set_performance_mode(PerformanceMode::LowLatency)
                .set_direction::<Input>()
                .set_sharing_mode(SharingMode::Exclusive)
                .set_usage(oboe::Usage::Game)
                .set_format::<f32>()
                .set_sample_rate(SAMPLE_RATE)
                .set_frames_per_callback(BUFFER_SIZE)
                .set_channel_count::<Mono>()
                .set_callback(InputRecorder::<f32, Mono>::new())
                .open_stream()
                .unwrap();

            log::info!("start stream: {:?}", stream);

            stream.start().unwrap();
            self.stream = Some(stream);
            return String::from("open stream");
        } else {
            return String::from("Did not open stream");
        }
    }
}

pub struct InputRecorder<F, C> {
    sender: Option<mpsc::Sender<Vec<f32>>>,
    marker: PhantomData<(F, C)>,
}

impl<F, C> Drop for InputRecorder<F, C> {
    fn drop(&mut self) {
        println!("drop InputRecorder generator");
    }
}

impl<F, C> InputRecorder<F, C> {
    pub fn new() -> Self {
        println!("init InputRecorder generator");
        unsafe {
            if let Some(sender) = &BUFFER_WRITE_SENDER {
                let tx = sender.lock().unwrap().clone();
                return Self {
                    sender: Some(tx),
                    marker: PhantomData,
                };
            } else {
                return Self {
                    sender: None,
                    marker: PhantomData,
                };
            }
        }
    }
}

impl AudioInputCallback for InputRecorder<f32, Mono> {
    type FrameType = (f32, Mono);

    fn on_audio_ready(
        &mut self,
        _stream: &mut dyn AudioInputStreamSafe,
        frames: &[f32],
    ) -> DataCallbackResult {
        if let Some(sender) = &self.sender {
            sender.send(Vec::from(frames));
        }

        DataCallbackResult::Continue
    }
}

pub fn start_calculating_notes() {
    unsafe {
        let (tx, rx) = mpsc::channel::<Vec<f32>>();
        BUFFER_WRITE_SENDER = Some(Mutex::new(tx));

        let mut record = AudioRecord::default();
        record.try_start();

        loop {
            let frames = rx.recv().unwrap();

            thread::spawn(move || {
                read_buffer(frames.as_slice());
            });
        }
    }
}

pub fn read_buffer(frames: &[f32]) {
    let amplitude: f32 = frequency::get_amplitude(frames);
    let note = frequency::fft_to_musical_note(frames, amplitude);

    thread::spawn(move || unsafe {
        let mut result = CALCULATED_NOTE.write().unwrap();
        *result = format!(
            "{};{:.2};{:.2}",
            note.name, note.deviation_cents, note.amplitude
        )
        .to_string();
        drop(result);
    });
}

#[derive(Debug, Clone)]
pub struct AudioBuffer {
    buffer: Vec<f32>,
}

impl AudioBuffer {
    fn new() -> Self {
        let buffer = vec![0.0; BUFFER_SIZE as usize];

        Self { buffer }
    }

    fn write(&mut self, samples: &[f32]) {
        let mut i = 0;
        for &sample in samples {
            self.buffer[i] = sample;
            i = i + 1;
        }
    }

    fn read(self, output: &mut [f32]) {
        let mut i = 0;
        for out in output.iter_mut() {
            *out = self.buffer[i];
            i = i + 1;
        }
    }
}

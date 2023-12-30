use lazy_static::lazy_static;
use rustfft::num_complex::ComplexFloat;
use rustfft::{Fft, FftPlanner};

use atomic_float::AtomicF32;
use std::f32::consts::PI;
use std::marker::PhantomData;
use std::sync::Mutex;
use std::time::{Duration, Instant};
use std::{sync::atomic::Ordering, sync::mpsc, sync::Arc, sync::RwLock, thread};

lazy_static! {
    pub static ref NOTES_FREQ: [f32; 132] = {
        let a4_freq = 440.0;
        let mut notes_freqs = [0.0; 132];
        let distance_c0_from_a4 = 57.0;
        notes_freqs[0] = a4_freq / 2.0.powf(distance_c0_from_a4 / 12.0);

        for i in 1..notes_freqs.len() {
            notes_freqs[i] = notes_freqs[i - 1] * 2.0.powf(1.0 / 12.0)
        }

        notes_freqs
    };
    static ref FFT_PLANNER: Arc<dyn Fft<f32>> =
        { FftPlanner::new().plan_fft(BUFFER_SIZE as usize, rustfft::FftDirection::Forward) };
}
const SAMPLE_RATE: i32 = 44100;
const BUFFER_SIZE: i32 = 4096;

#[derive(Debug)]
pub struct Note {
    pub name: String,
    pub deviation_cents: f32,
    pub amplitude: f32,
}

fn get_deviation_cents(frequency: f32, target_frequency: f32) -> f32 {
    return 1200 as f32 * (frequency / target_frequency).log2();
}

fn find_closest(arr: &[f32], n: usize, target: f32) -> (f32, usize) {
    if target <= arr[0] {
        return (arr[0], 0);
    }
    if target >= arr[n - 1] {
        return (arr[n - 1], n - 1);
    }

    let mut i = 0;
    let mut j = n;
    let mut mid = 0;
    while i < j {
        mid = (i + j) / 2;
        if arr[mid] == target {
            return (arr[mid], mid);
        }
        if target < arr[mid] {
            if mid > 0 && target > arr[mid - 1] {
                return get_closest(arr, mid - 1, mid, target);
            }
            j = mid;
        } else {
            if mid < n - 1 && target < arr[mid + 1] {
                return get_closest(arr, mid, mid + 1, target);
            }
            i = mid + 1;
        }
    }
    (arr[mid], mid)
}

fn get_closest(arr: &[f32], i: usize, j: usize, target: f32) -> (f32, usize) {
    if target - arr[i] >= arr[j] - target {
        (arr[j], j)
    } else {
        (arr[i], i)
    }
}

fn calculate_note(frequency: f32, amplitude: f32) -> Note {
    let (closest, closest_idx) = find_closest(NOTES_FREQ.as_slice(), NOTES_FREQ.len(), frequency);
    let note = get_note(
        frequency,
        amplitude,
        closest,
        closest_idx as i16,
        NOTES_FREQ.as_slice(),
    );

    note
}

fn get_note(
    frequency: f32,
    amplitude: f32,
    closest: f32,
    closest_idx: i16,
    notes_freqs: &[f32],
) -> Note {
    let note_offsets: std::collections::HashMap<i16, &str> = [
        (0, "C"),
        (1, "C#"),
        (2, "D"),
        (3, "D#"),
        (4, "E"),
        (5, "F"),
        (6, "F#"),
        (7, "G"),
        (8, "G#"),
        (9, "A"),
        (10, "A#"),
        (11, "B"),
    ]
    .iter()
    .cloned()
    .collect();
    let idx_offset = closest_idx % 12;
    let note_name = note_offsets.get(&idx_offset).unwrap();

    let octave_num: i16 = closest_idx / 12;

    Note {
        name: format!("{}{}", note_name, octave_num.to_string()),
        deviation_cents: get_deviation_cents(frequency, closest),
        amplitude,
    }
}

pub fn fft_to_musical_note(frames: &[f32], amplitude: f32) -> Note {
    let fft = FFT_PLANNER.clone();

    let mut complex_output: Vec<rustfft::num_complex::Complex<f32>> = frames
        .iter()
        .map(|&x| rustfft::num_complex::Complex::new(x, 0.0))
        .collect();
    fft.process(&mut complex_output);

    let sample_rate = SAMPLE_RATE;
    let length = frames.len();

    let mut max_idx = 0;
    let mut magnitude = f32::MIN;
    for i in 0..length / 2 {
        let val = complex_output.get(i).unwrap().abs();
        if (val > magnitude) {
            magnitude = val;
            max_idx = i;
        }
    }

    let frequency = max_idx as f32 * sample_rate as f32 / length as f32;
    calculate_note(frequency, amplitude)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn should_calculate_nearest_note_for_frequency() {
        let mut frequency = 440.0;
        let amplitude = 1.0;
        let mut note = calculate_note(frequency, amplitude);
        assert!(note.name == "A4");

        frequency = 880.0;
        note = calculate_note(frequency, amplitude);
        assert!(note.name == "A5");

        frequency = 16.0;
        note = calculate_note(frequency, amplitude);
        assert!(note.name == "C0");
    }
}

pub(crate) fn get_amplitude(frames: &[f32]) -> f32 {
    let mut max_amplitude = f32::MIN;
    for i in 0..frames.len() {
        if (max_amplitude < frames[i]) {
            max_amplitude = frames[i];
        }
    }
    max_amplitude
}

#![allow(unused)]

#[macro_use]
extern crate log;
extern crate android_logger;

use android_logger::Config;
use log::LevelFilter;
use record::CALCULATED_NOTE;

uniffi::include_scaffolding!("notix_backend");

mod audio;
mod frequency;
mod music;
mod record;
use audio::*;
use record::AudioRecord; // 1.4.0

pub fn get_note() -> String {
    unsafe { CALCULATED_NOTE.read().unwrap().to_string() }
}

pub fn start_recording() {
    android_logger::init_once(Config::default().with_max_level(LevelFilter::Debug));
    info!("Starting record");
    std::thread::spawn(|| {
        record::start_calculating_notes();
    });
}

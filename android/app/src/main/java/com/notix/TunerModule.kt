package com.notix.modules

import android.media.AudioRecord
import android.media.MediaRecorder
import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.notix.uniffi.getNote
import com.notix.uniffi.startRecording

class TunerModule internal constructor(context: ReactApplicationContext) :
        ReactContextBaseJavaModule(context) {

    override fun getName(): String {
        return "TunerModule"
    }

    @ReactMethod
    fun recordAudio() {
        calculateFrequencies()
    }

    private fun sendEvent(reactContext: ReactContext, eventName: String, params: WritableMap?) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }

    private var listenerCount = 0
    val NOTE_CALCULATED = "NOTE_CALCULATED"

    @ReactMethod
    fun addListener(_eventName: String) {
        listenerCount += 1
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        listenerCount -= count
    }

    fun calculateFrequencies() {
        startRecording()
        Thread.sleep(100)
        Thread {
            while (true) {
                readAudioData()
                Thread.sleep(100)
            }
        }
        .start()
    }

    private fun readAudioData() {
        val note = getNote()
        val params = Arguments.createMap().apply {
            putString("note", note)
        }
        sendEvent(getReactApplicationContext(), NOTE_CALCULATED, params)
    }
}

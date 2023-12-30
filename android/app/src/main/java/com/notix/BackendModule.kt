
package com.notix.modules

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class BackendModule internal constructor(context: ReactApplicationContext?) :
        ReactContextBaseJavaModule(context) {

    override fun getName(): String {
        return "BackendModule"
    }

}

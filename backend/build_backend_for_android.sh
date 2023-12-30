
#!/usr/bin/bash

######################################
###### uncomment when need to setup DB
######################################
# rm notix.db
######################################



######################################
###### Compile & setup for ARM 64 android
######################################
cross run --target=aarch64-linux-android --features=uniffi/cli --bin=uniffi-bindgen generate src/notix_backend.udl --language kotlin --out-dir=.
cross build --target=aarch64-linux-android --release --lib
rm -rf ../android/app/src/main/jniLibs 
mkdir -p ../android/app/src/main/jniLibs/arm64-v8a 
cp target/aarch64-linux-android/release/libnotix_backend.so ../android/app/src/main/jniLibs/arm64-v8a/libnotix_backend.so
######################################

######################################
###### Generate Kotlin bindings
######################################
cross run --target=aarch64-linux-android --bin uniffi-bindgen generate --library target/aarch64-linux-android/release/libnotix_backend.so   --language kotlin --out-dir .
######################################

# useful when using udl definitions
# cross run --target=aarch64-linux-android --bin=uniffi-bindgen generate src/notix_backend.udl --language kotlin --out-dir=.


######################################
###### Cleanup
######################################
rm -rf ../android/app/src/main/java/com/notix/uniffi
cp -r com/notix/uniffi ../android/app/src/main/java/com/notix/uniffi
rm -rf com
######################################

######################################
###### Typescript bindings
######################################
# cp bindings/* ../rust-types/
######################################

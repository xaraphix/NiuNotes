fn main() {
    uniffi_build::generate_scaffolding("src/notix_backend.udl").unwrap();
    println!("cargo:rustc-link-lib=c++abi");
}

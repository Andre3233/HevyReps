export const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

if(!BACKEND_URL){
    console.warn("EXPO_PUBLIC_BACKEND_URL não definido.")
}

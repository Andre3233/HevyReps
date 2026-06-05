export const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
export const CLOUDINARY_URL = process.env.EXPO_PUBLIC_CLOUDINARY_URL;

if(!BACKEND_URL){
  console.warn("EXPO_PUBLIC_BACKEND_URL não definido.");
}

if (!CLOUDINARY_URL) {
  console.warn("EXPO_PUBLIC_CLOUDINARY_URL não definido.");
}
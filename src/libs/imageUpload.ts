import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {v2 as cloudinary} from 'cloudinary'
import {v4} from 'uuid'

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "/profilePicture",
    allowedFormats: ["jpg", "png"],
    public_id: () => `${v4()}`
  },
});

export function uploadImage(name: string){
  const imageUpload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
  }).single(name); //'imageUpload' from the image append in formdata
  return imageUpload
}

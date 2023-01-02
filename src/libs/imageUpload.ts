import multer from "multer";
import { CloudinaryStorage, OptionCallback, Options } from "multer-storage-cloudinary";
import {v2 as cloudinary} from 'cloudinary'
import {v4} from 'uuid'

declare interface CloudinaryOptions extends Options {
  params: {
    folder: string,
    allowedFormats: string[],
    public_id: OptionCallback<string>
  }
}

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const multerOpts: CloudinaryOptions = {
  cloudinary: cloudinary,
  params: {
    folder: "/profilePicture",
    allowedFormats: ["jpg", "png"],
    public_id: () => `${v4()}`
  },
};

const storage = new CloudinaryStorage(multerOpts);

export function uploadImage(name: string){
  const imageUpload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
  }).single(name); //'imageUpload' from the image append in formdata
  return imageUpload
}

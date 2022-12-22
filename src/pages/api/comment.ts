import type { NextApiRequest, NextApiResponse } from 'next'
import multer from 'multer'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import {v2 as cloudinary} from 'cloudinary'
import nc from "next-connect";
import {prisma} from '../../server/db/client'
import { getServerAuthSession } from '../../server/common/get-server-auth-session';

export interface NextApiRequestWithFile extends NextApiRequest{
  file: any
}

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
    public_id: (req, file) => `${file.filename}-${req.body.title}`,
  },
});

const uploadPostImage = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
}).single("imageUpload"); //'imageUpload' from the image append in formdata


const handler = nc<NextApiRequestWithFile, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
    next()
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(uploadPostImage)
  .post(async (req, res) => {
    const session = await getServerAuthSession({ req, res });
    const imagePath = req?.file !== null ? req?.file?.path : null

    if(session){
      try {
        await prisma?.comment?.create({
          data:{
            comment: req.body.comment,
            image: imagePath,
            userId: Number(session?.user?.id),
            postId: Number(req.body.postId)
          }
        })
      } catch (error) {
        console.log(error)
        res.status(400).send('comment not created')
      }
    res.status(200).send('comment created')
    }else{
      res.send('You need to login')
    }
    
  })

  export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
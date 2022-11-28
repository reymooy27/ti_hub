import type { NextApiRequest, NextApiResponse } from 'next'
import multer from 'multer'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import {v2 as cloudinary} from 'cloudinary'
import nc from "next-connect";
import {prisma} from '../../server/db/client'
import { getServerAuthSession } from '../../server/common/get-server-auth-session';

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
}).single("imageUpload");

const handler = nc<NextApiRequest, NextApiResponse>({
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
        await prisma?.post?.create({
          data:{
            title: req.body.title,
            userId: session?.user?.id,
            image: imagePath
          }
        })
      } catch (error) {
        res.status(400).send('post not created')
      }
    res.status(200).send('post created')
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
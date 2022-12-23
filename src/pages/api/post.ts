import type { NextApiResponse } from 'next'
import nc from "next-connect";
import {prisma} from '../../server/db/client'
import { getServerAuthSession } from '../../server/common/get-server-auth-session';
import { NextApiRequestWithFile } from './comment';
import { uploadImage } from '../../libs/imageUpload';

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
  .use(uploadImage('imageUpload'))
  .post(async (req, res) => {
    const session = await getServerAuthSession({ req, res });
    const imagePath = req?.file !== null ? req?.file?.path : null
    
    if(session){
      try {
        await prisma?.post?.create({
          data:{
            title: req.body.title,
            userId: session?.user?.id as number,
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
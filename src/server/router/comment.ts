import { z } from "zod";
import { createRouter } from "./context";
import { TRPCError } from "@trpc/server";

export const commentRouter = createRouter()
.query('get-comments',{
  input: z.object({
    postId: z.number()
  }),
  async resolve({ctx, input}){
    try{
      const comments = await ctx.prisma.comment.findMany({
        where:{
          postId: input.postId
        },
        include:{
          user:{
            select:{
              name: true,
              image: true
            }
          },
          likes:{
            select:{
              id: true
            }
          }
        }
      })
      return comments
    }catch(error){
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'There is something error'
      })
    }
  }
})
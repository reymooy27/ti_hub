import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createProtectedRouter } from "./protected-router";

export const commentRouter = createProtectedRouter()
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
              userId: true
            }
          },
          _count: true
        },
        orderBy:{
          createdAt: 'desc'
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
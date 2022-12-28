import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createProtectedRouter } from "./protected-router";

export const userRouter = createProtectedRouter()
.query('user-details',{
  input: z.object({
    userId: z.number()
  }),
  async resolve({ctx, input}){
    try{
      const user = await ctx.prisma.user.findUnique({
        where:{
          id: input.userId
        },
        include:{
          posts: {
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
          },
        }
      })
      return user
    }catch(error){
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'There is something error'
      })
    }
  }
})
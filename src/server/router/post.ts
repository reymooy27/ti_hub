import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const postRouter = createRouter()
  .query("get-all-posts", {
    async resolve({ ctx }) {
      try {
        const posts = await ctx.prisma.post.findMany({
          include:{
            user:{
              select:{
                name: true,
                image: true
              }
            }
          }
        })
        return posts
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'There is something error'
        })
      }
    },
  })
  .query("get-post", {
    input: z.object({
      id: z.number()
    }),
    async resolve({ ctx, input }) {
      try {
        const post = await ctx.prisma.post.findUnique({
          where:{
            id: input.id
          },
          include:{
            user:{
              select:{
                name: true,
                image: true
              }
            }
          }
        })
        return post
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'There is something error'
        })
      }
    },
  })
  // .mutation('create-post',{
  //   input: z.object({
  //     title: z.string()
  //   }),
  //   async resolve({ctx, input}){
  //     try {
  //       const post = await ctx?.prisma?.post?.create({
  //         data:{
  //           title: input.title,
  //           userId: ctx?.session?.user?.id,
  //         }
  //       })
  //       return post
  //     } catch (error) {
  //       throw new TRPCError({
  //         code: 'INTERNAL_SERVER_ERROR',
  //         message: 'There is something error'
  //       })
  //     }
  //   }
  // })


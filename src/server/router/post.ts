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
            },
            likedBy: {
              select:{
                userId: true,
                createdAt: true
              }
            },
          },
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
                image: true,
              }
            },
            likedBy: {
              select:{
                userId: true,
              }
            },
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
  .query('posts-liked-by-user',{
    async resolve({ ctx }) {
      try {
        const posts = await ctx.prisma.post.findMany({
          where: {
            likedBy:{
              some:{
                userId: ctx?.session?.user?.id as number
              }
            }
          },
          include:{
            user:{
              select:{
                name: true,
                image: true
              }
            },
            likedBy: {
              where:{
                userId: ctx?.session?.user?.id as number,
              },
              select:{
                userId: true,
                createdAt: true
              },
            },
          },
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
  .mutation('like-post',{
    input: z.object({
      postId: z.number(),
    }
    ),
    async resolve({ctx, input}){
      try {
        const like = ctx.prisma.like.create({
          data:{
            postId: input.postId,
            userId: Number(ctx?.session?.user?.id),
          }
        })
        return like
        
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'There is something error'
        })
      }
    }
  })

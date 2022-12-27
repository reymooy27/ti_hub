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
            likes: {
              select:{
                userId: true,
              }
            },
            _count: true
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
            _count: true,
            user:{
              select:{
                name: true,
                image: true,
              }
            },
            likes: {
              select:{
                userId: true,
              }
            },
            comments:{
              include:{
                _count: true,
                user:{
                  select:{
                    id: true,
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
  .query('posts-liked-by-user',{
    async resolve({ ctx }) {
      try {
        const posts = await ctx.prisma.post.findMany({
          where: {
            likes:{
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
            likes: {
              where:{
                userId: ctx?.session?.user?.id as number,
              },
              select:{
                userId: true,
                createdAt: true
              },
            },
            _count: true
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
      postId: z.number().optional(),
      commentId: z.number().optional()
    }
    ),
    async resolve({ctx, input}){
      try {
        const like = ctx.prisma.like.create({
          data:{
            postId: input.postId,
            commentId: input.commentId,
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
  .mutation('unlike-post',{
    input: z.object({
      postId: z.number().optional(),
      commentId: z.number().optional(),
    }
    ),
    async resolve({ctx, input}){
      try {
        const like = ctx.prisma.like.deleteMany({
          where:{
            postId: input.postId,
            commentId: input.commentId,
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

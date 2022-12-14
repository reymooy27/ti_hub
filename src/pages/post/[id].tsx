import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import { trpc } from '../../utils/trpc'
const Post = dynamic(()=> import('../../components/Post'))
import type { Like, Count } from '../../components/Post'
import dynamic from 'next/dynamic'
import PostSkeleteon from '../../components/PostSkeleteon'
import LeftSideBar from '../../components/LeftSideBar'
import RightSideBar from '../../components/RightSideBar'
export default function PostPage() {

  const router = useRouter()

  const id: number = parseInt(router.query.id as string, 10)
  const post = trpc.useQuery(['post.get-post', {id}])
  const comments = trpc.useQuery(['comment.get-comments', {postId: id}])

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      
      <div className="sm:w-[66%] w-full h-full flex flex-col justify-start gap-3">
        {post.isLoading ? <PostSkeleteon/> :
          <Post
            postId={post?.data?.id as number} 
            title={post?.data?.title as string} 
            username={post?.data?.user.name as string} 
            profileImage={post?.data?.user.image as string} 
            image={post?.data?.image as string} 
            createdAt={post?.data?.createdAt as Date}
            likes={post?.data?.likes as Like[]}
            noLink={true}
            count={post?.data?._count as Count}
            userId={Number(post?.data?.userId)}
            />
        }

        <h1>Comments</h1>
        {comments?.isLoading && Array(5).fill('').map((p,i)=> (<PostSkeleteon key={i}/>)) }
        {Number(comments?.data?.length) < 1 && 'No Comments' }
        {comments?.data?.map(c=>(
          <Post
            key={c.id}
            postId={c.id as number} 
            title={c.comment as string} 
            username={c.user.name as string} 
            profileImage={c.user.image as string} 
            image={c.image as string} 
            createdAt={c.createdAt as Date}
            likes={c.likes as Like[]}
            noLink={true}
            count={c?._count}
            userId={c.userId}
            />
        ))}
      </div>
    </>
  )
}

PostPage.getLayout = function getLayout(page: React.ReactElement){
  return(
    <Layout>
      <>
        <LeftSideBar/>
        {page}
        <RightSideBar/>
      </>
    </Layout>
  )
}

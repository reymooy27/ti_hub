import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import { trpc } from '../../utils/trpc'
import Post from '../../components/Post'
import type { LikedBy } from '../../components/Post'
export default function PostPage() {

  const router = useRouter()

  const id: number = parseInt(router.query.id as string, 10)

  const post = trpc.useQuery(['post.get-post', {id}])

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      
      <>
        {post.isLoading ? 'Loading...' :
          <Post
            postId={post?.data?.id as number} 
            title={post?.data?.title as string} 
            username={post?.data?.user.name as string} 
            profileImage={post?.data?.user.image as string} 
            image={post?.data?.image as string} 
            createdAt={post?.data?.createdAt as Date}
            likedBy={post?.data?.likedBy as LikedBy[]}
            noLink={true}
            />
        }
      </>
    </>
  )
}

PostPage.getLayout = function getLayout(page: React.ReactElement){
  return(
    <Layout>
      {page}
    </Layout>
  )
}

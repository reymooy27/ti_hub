import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { trpc } from '../../utils/trpc'
import dynamic from 'next/dynamic'
const Post = dynamic(()=> import('../../components/Post'))
import Layout from '../../components/Layout'
import PostSkeleteon from '../../components/PostSkeleteon'

export default function ProfilePage() {

  const router = useRouter()
  const userId = parseInt(router.query.id as string, 10)

  // const likedPosts = trpc.useQuery(['post.posts-liked-by-user'])
  // const sortedLikedPosts = likedPosts?.data?.sort((a,b)=>{
  //   const postA = new Date(a.likes[0]?.createdAt);
  //   const postB = new Date(b.likes[0]?.createdAt);
  //   return Number(postB) - Number(postA);
  // })
  const userDetails = trpc.useQuery(['user.user-details', {userId}])
  const userPost = userDetails.data?.posts
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <>
      <div className='w-full h-full flex justify-between'>
        <h1 className='underline'>Tweets</h1>
        <h1>Tweets & replies</h1>
        <h1>Media</h1>
        <h1>Likes</h1>
      </div>
        {userDetails.isLoading && Array(5).fill('').map((p,i)=> (<PostSkeleteon key={i}/>))}
        {userPost?.length as number < 1 && 'No liked post'}
        {userPost?.map(post=>(
          <Post
            key={post.id} 
            postId={post.id}
            title={post.title} 
            username={post.user.name} 
            profileImage={post.user.image} 
            image={post.image} 
            createdAt={post.createdAt}
            likes={post.likes}
            count={post._count}
            userId={post.userId}
          />
        ))}
      </>
    </>

  )
}

ProfilePage.getLayout = function getLayout(page: React.ReactElement){
  return(
    <Layout>
      {page}
    </Layout>
  )
}

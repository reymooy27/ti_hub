import React from 'react'
import { trpc } from '../utils/trpc'
import Post from '../components/Post'
import Head from 'next/head'
import Layout from '../components/Layout'

export default function ProfilePage() {

  const likedPosts = trpc.useQuery(['post.posts-liked-by-user'])
  const sortedLikedPosts = likedPosts?.data?.sort((a,b)=>{
    const postA = new Date(a.likedBy[0]?.createdAt);
    const postB = new Date(b.likedBy[0]?.createdAt);
    return Number(postB) - Number(postA);
  })

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <>
        <h1>Liked Post</h1>
        {likedPosts.isLoading && 'Loading...'}
        {likedPosts?.data?.length as number < 1 && 'No liked post'}
        {likedPosts.data?.map(post=>(
          <Post
            key={post.id} 
            postId={post.id}
            title={post.title} 
            username={post.user.name} 
            profileImage={post.user.image} 
            image={post.image} 
            createdAt={post.createdAt}
            likedBy={post.likedBy}
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

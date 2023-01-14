import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { trpc } from '../../utils/trpc'
import dynamic from 'next/dynamic'
const Post = dynamic(()=> import('../../components/Post'))
import PostSkeleteon from '../../components/PostSkeleteon'
import RightSideBar from '../../components/RightSideBar'
import Image from 'next/image'
import Layout from '../../components/Layout'
import { Skeleton } from '@chakra-ui/react'

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

      <div className='w-full sm:w-[66%] h-full'>
        <div className='w-full h-[200px] rounded-xl bg-red-200 relative'>
          <div className='absolute bottom-[-50px] left-[20px] w-[100px] h-[100px]'>
            {!userDetails?.isLoading
            ? 
              <Image 
                src={userDetails?.data?.image as string} 
                className='rounded-full border-solid border-2 border-background' 
                width='100px' 
                height='100px' 
                alt='profile-image'
              /> 
            :
              <Skeleton startColor='#282828' endColor='#282828' opacity={1} rounded='full' className='rounded-full w-[100px] h-[100px]'/>
            }
          </div>
        </div>
        <div className='w-full flex justify-end py-4'>
          <button className='p-2 h-fit rounded-xl border-2 border-primary bg-transparent hover:bg-primary text-primary hover:text-black transition ease-in-out duration-300'>Edit Profile</button>
        </div>
        <div className='w-full flex flex-col px-5'>
          <h1 className='text-bold text-2xl'>{userDetails?.data?.name}</h1>
          <span className='text-grey text-sm'>@username</span>
          <div className='py-3 w-full'>
            <p>Fullstack Developer • React, NodeJS, 
              NextJS • Student of Citra Bangsa University • 
              Current Project: https://ti-hub.vercel.app</p>
          </div>
        </div>
        <div className='w-full h-full flex justify-between mt-5 mb-5 px-10'>
          <h1 className='underline decoration-primary decoration-2 underline-offset-[10px]'>Tweets</h1>
          <h1>Tweets & replies</h1>
          <h1>Media</h1>
          <h1>Likes</h1>
        </div>
        <div className="flex flex-col gap-3">
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
        </div>
      </div>
    </>

  )
}

ProfilePage.getLayout = function getLayout(page: React.ReactElement){
  return(
    <Layout>
      <>
        {page}
        <RightSideBar/>
      </>
    </Layout>
  )
}


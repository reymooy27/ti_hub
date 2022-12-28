import React, { useEffect } from 'react'
import { trpc } from '../utils/trpc'
import Post from './Post'
import TweetInput from './TweetInput'

export default function Main() {

  const posts = trpc.useQuery(['post.get-all-posts'])

  useEffect(() => {
    const sp = sessionStorage.getItem('scrollPosition')
    if(sp){
      window?.scrollTo(0, parseInt(sp, 10))
      sessionStorage.removeItem('scrollPosition')
    }
  }, [])
  

  function saveScrollPosition(){
    sessionStorage.setItem('scrollPosition', window.scrollY.toString())
  }

  return (
    <div className="w-[66%] h-full flex flex-col justify-start gap-3">
      <TweetInput/>
      {posts.isLoading ? <h1>Loading...</h1>   
      : 
        posts?.data?.length as number < 1 ? <h1>No Post</h1> : 
        posts?.data?.map((post)=>(
          <div onClick={saveScrollPosition} key={post.id}>
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
          </div>
        ))
      }
    </div>
  )
}

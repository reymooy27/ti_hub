import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { trpc } from '../utils/trpc'
import Post from './Post'
import { Session } from 'next-auth'


export default function Main({session}: {session: Session}) {

  const posts = trpc.useQuery(['post.get-all-posts'])
  const postMutation = trpc.useMutation('post.create-post')

  const [input, setInput] = useState<string>('')
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  useEffect(()=>{
    if(input !== ''){
      setIsDisabled(false)
    }else{
      setIsDisabled(true)
    }
  },[input])

  const handlePost = ()=>{
    postMutation.mutate({title: input}, {
      onSuccess(data, variables, context) {
        window.alert(data)
        setInput('')
      },
      onError(error, variables, context) {
        setInput('')
      },
    })
  }

  return (
    <div className="w-[66%] h-full flex flex-col justify-start gap-3">
      <div className='flex w-full h-fit p-5 bg-secondary rounded-xl gap-3'>
        <div className='flex justify-start h-fit'>
          <Image alt='profile-pic' src={session?.user?.image} width={50} height={50} className='rounded-full' />
        </div>
        <div className='w-full flex flex-col gap-3'>
          <div className='flex justify-center items-center'>
            <input onChange={(e)=> setInput(e.target.value)} 
              value={input} 
              type="text" 
              className='bg-background text-white p-5 w-full h-[40px] rounded-xl'/>
          </div>
          <div className='flex w-full justify-between gap-3'>
            <button className="rounded-xl w-full h-fit p-2 bg-background">Photo</button>
            <button className="rounded-xl w-full h-fit p-2 bg-background">Photo</button>
            <button className="rounde
            d-xl w-full h-fit p-2 bg-background">Photo</button>
            <button className="rounded-xl w-full h-fit p-2 bg-background">Photo</button>
          </div>
          <div className='w-[120px] self-end'>
            <button 
              disabled={isDisabled}
              onClick={handlePost} 
              className={`rounded-xl w-full h-fit p-2 bg-background 
              hover:opacity-60 transition ease-in-out duration-300
              ${isDisabled ? 'opacity-60' : 'opacity-100'}
              `}
              >
                Post
            </button>
          </div>
        </div>
      </div>
      {posts.isLoading ? <h1>Loading...</h1>   
      : 
        posts?.data?.length < 1 ? <h1>No Post</h1> : 
        posts.data?.map((post: any)=>(
          <Post 
            key={post.id} 
            title={post.title} 
            username={post.user.name} 
            image={post.user.image} 
            createdAt={post.createdAt}/>
        ))
      }
    </div>
  )
}

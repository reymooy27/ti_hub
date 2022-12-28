import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { trpc } from '../utils/trpc'
import { useSession } from 'next-auth/react'
import CommentButton from './Modal'

export type Count ={
  likes?: number,
  comments?: number
}

export type Like = {
  id?: number | null,
  userId: number | null,
  postId?: number | null,
  createdAt?: Date | null
}

export type PostProps = {
  postId: number,
  title?: string | null
  image?: string | null
  username: string | null
  createdAt: Date,
  profileImage: string | null,
  likes: Like[],
  noLink?: boolean,
  count: Count,
  userId: number
}

export default function Post(
  { postId, 
    title , 
    image, 
    profileImage, 
    username, 
    createdAt, 
    likes, 
    noLink, 
    count,
    userId
  }: PostProps) {

  const {data: session} = useSession()
  const likeMutation = trpc.useMutation(['post.like-post'])
  const unlikeMutation = trpc.useMutation(['post.unlike-post'])
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [likeCounts, setLikeCounts] = useState<number>(0)
  const likedByUser = likes.filter(value=> value?.userId === session?.user?.id).length > 0 ? true : false

  useEffect(() => {
    if(likedByUser){
      setIsLiked(true)
    }else{
      setIsLiked(false)
    }

    setLikeCounts(Number(count?.likes))
  }, [likedByUser, count?.likes])

  function handleLikeButton(){
    if(isLiked === true){
      setIsLiked(false)
      setLikeCounts((likes)=> likes - 1)
      unlikeMutation.mutate({postId: postId})
    }else{
      setIsLiked(true)
      setLikeCounts((likes)=> likes + 1)
      likeMutation.mutate({postId: postId})
    }
  }

  const Unwrapped = ()=> {
    return(
      <div className='flex'>
        <div className='mr-3'>
          <Link href={`/user/${userId}`}>
            <a>
              {profileImage && 
                <Image 
                alt='profile-pic' 
                src={profileImage} 
                width={50} 
                height={50} 
                className='rounded-full' 
                />
              }
            </a>
          </Link>
        </div>
        <div className='w-full'>
          <div className='flex gap-3'>
            <Link href={`/user/${userId}`}>
              <h1 className='cursor-pointer font-bold hover:underline'>{username}</h1>
            </Link>
            <h1>{new Date(createdAt).toLocaleDateString()}</h1>
          </div>
          <div className='w-full'>
            <p>{title}</p>
          </div>
          {image && 
            <div className='w-full'>
              <img 
                alt='image' 
                src={image} 
                width={"100%"} 
                height={'100%'} 
                className='w-full h-full rounded-xl pt-2'/>
            </div>
          }
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full p-4 rounded-xl bg-secondary transition-all ease-in-out duration-200 hover:bg-hover-secondary">
      {noLink ? <Unwrapped/> : 
        <Link href={`/post/${postId}`}>
          <a>
            {<Unwrapped/>}
          </a>
        </Link> 
      }
        <div className='flex justify-between items-center pt-5'>
          <div className='flex gap-1 items-center'>
            <CommentButton postId={postId}/>
            {count?.comments !== undefined && count?.comments > 0 && <p>{count?.comments}</p>}
          </div>  
          <div className='flex gap-1 items-center'>
            <FontAwesomeIcon icon='heart' width={24} className='cursor-pointer' color={isLiked ? 'red' : 'white'} onClick={handleLikeButton} />
            {likeCounts !== undefined && likeCounts > 0 ? <p>{likeCounts}</p> : null}
          </div>
          <div className='flex gap-1 items-center'>
            <FontAwesomeIcon icon='retweet' width={24} className='cursor-pointer'/>
          </div>
          <FontAwesomeIcon icon='share' width={24} className='cursor-pointer'/>
        </div>
      </div>
  )
}
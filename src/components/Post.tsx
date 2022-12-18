import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faRetweet, faShare, faComment} from '@fortawesome/free-solid-svg-icons'
import { trpc } from '../utils/trpc'
import { useSession } from 'next-auth/react'

export type LikedBy = {
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
  likedBy: LikedBy[]
}

library.add(faHeart, faRetweet, faShare, faComment)

export default function Post({postId, title , image, profileImage, username, createdAt, likedBy}: PostProps) {

  const {data: session} = useSession()

  const mutation = trpc.useMutation(['post.like-post'])

  const [isLiked, setIsLiked] = useState<boolean>(false)

  const likedByUser = likedBy.filter(value=> value?.userId === session?.user?.id).length > 0 ? true : false

  useEffect(() => {
    if(likedByUser){
      setIsLiked(true)
    }else{
      setIsLiked(false)
    }
  }, [likedByUser])

  console.log(isLiked)
  
  function handleLikeButton(){
    if(isLiked){
      setIsLiked(false)
      mutation.mutate({postId: postId, liked: false})
    }else{
      setIsLiked(true)
      mutation.mutate({postId: postId, liked: true})
    }
  }
  
  return (
    <>
      <div className="w-full h-full p-4 rounded-xl bg-secondary flex transition-all ease-in-out duration-300">
          <div className='mr-3'>
            <Link href='/profile'>
              <a>
                {profileImage && <Image alt='profile-pic' src={profileImage} width={50} height={50} className='rounded-full' />}
              </a>
            </Link>
          </div>
          <div className='w-full'>
            <div className='flex gap-3'>
              <Link href='/profile'>
                <a>
                  <h1 className='font-bold hover:underline'>{username}</h1>
                </a>
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

            <div className='flex justify-between pt-5'>  
              <FontAwesomeIcon icon='comment' width={24} />
              <FontAwesomeIcon icon='heart' width={24} color={isLiked ? 'red' : 'white'} onClick={handleLikeButton} />
              <FontAwesomeIcon icon='retweet' width={24}/>
              <FontAwesomeIcon icon='share' width={24}/>
            </div>
          </div>
      </div>
    </>
  )
}

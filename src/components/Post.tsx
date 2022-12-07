import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faRetweet, faShare, faComment} from '@fortawesome/free-solid-svg-icons'

export type PostProps = {
  postId: number,
  title: string | null
  image: string | null
  username: string | null
  createdAt: Date,
  profileImage: string | null,
}

library.add(faHeart, faRetweet, faShare, faComment)

export default function Post({postId, title , image, profileImage, username, createdAt}: PostProps) {
  return (
    <Link href={`/post/${postId}`}>
      <a>
        <div className="w-full h-full p-4 rounded-xl bg-secondary flex transition-all ease-in-out duration-300 hover:scale-[1.02]">
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
                  <img alt='image' src={image} width={"100%"} height={'100%'} className='w-full h-full rounded-xl pt-2'/>
                </div>
              }

              <div className='flex justify-between pt-5'>  
                <FontAwesomeIcon icon='comment' width={24}/>
                <FontAwesomeIcon icon='heart' width={24}/>
                <FontAwesomeIcon icon='retweet' width={24}/>
                <FontAwesomeIcon icon='share' width={24}/>
              </div>
            </div>
        </div>
      </a>
    </Link>
  )
}

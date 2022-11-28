import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export type PostProps = {
  title: string
  image: string
  username: string
  createdAt: string,
  profileImage: string,
}

export default function Post({title , image, profileImage, username, createdAt}: PostProps) {
  return (
    <div className="w-full h-full p-4 rounded bg-secondary flex">
        <div className='mr-3'>
          <Link href='/profile'>
            <a>
              <Image alt='profile-pic' src={profileImage} width={50} height={50} className='rounded-full' />
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
            <div className='w-full h-full'>
              <img alt='image' src={image} width={"100%"} className='w-full'/>
            </div>
          }
        </div>
    </div>
  )
}

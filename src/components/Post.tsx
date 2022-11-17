import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export type PostProps = {
  title: string
  image: string
  username: string
  createdAt: string
}

export default function Post({title, image, username, createdAt}: PostProps) {
  return (
    <div className="w-full h-[350px] p-4 rounded bg-secondary flex">
        <Link href='/profile'>
          <a className='mr-3'>
            <Image alt='profile-pic' src={image} width={50} height={50} className='rounded-full' />
          </a>
        </Link>
        <div>
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
        </div>
    </div>
  )
}

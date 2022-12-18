import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link';
import React from 'react'

export default function Header() {

  const {data: session} = useSession();

  return (
    <header className="flex justify-between w-full bg-secondary h-[60px] px-6 gap-6 fixed z-[3]">
      <div className='w-[33%] flex justify-start items-center gap-6'>
        <div className='bg-white rounder w-[40px] h-[40px]'></div>
        <div className='w-full'>
          <input type="text" className='w-full h-[40px] p-4 border bg-secondary text-white border-primary rounded-[15px]' />
        </div>
      </div>
      <div className='w-[66%] flex justify-center items-center gap-6'>
        <Link href='/' className='rounded w-[40px] h-[40px] bg-primary'>
          <a>Home</a>
        </Link>
        <Link href='/chats' className='rounded w-[40px] h-[40px] bg-primary'>
          <a>Chats</a>
        </Link>
        <Link href='/profile' className='rounded w-[40px] h-[40px] bg-primary'>
          <a>Profile</a>
        </Link>
        <Link href='/settings' className='rounded w-[40px] h-[40px] bg-primary'>
          <a>Setting</a>
        </Link>
        
      </div>
      <div className='w-[33%] flex justify-end items-center'>
        {session ? 
        <div className='flex items-center rounded-xl w-[120px] h-[40px] p-3 bg-background relative'>
          <h3>{session?.user?.name}</h3>
          <div className={`w-[200px] h-[200px] bg-red-900 rounded absolute top-[45px] right-0 shadow-xl hidden hover:block`}>
            <button className='bg-red-500' onClick={()=> signOut()}>Logout</button>
          </div>
        </div>
        :
          <Link className='bg-red-500' href="/login">
            <a>Login</a>
          </Link>
        }
      </div>
    </header>
  )
}

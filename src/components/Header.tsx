import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link';
import React from 'react'
import dynamic from 'next/dynamic'
const DropdownMenu = dynamic(()=> import('./DropdownMenu'))

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
        <Link href='/'>
          <a className='font-bold'>Home</a>
        </Link>
        <Link href='/chats'>
          <a className='font-bold'>Chats</a>
        </Link>
        <Link href={`/user/${session?.user?.id}`}>
          <a className='font-bold'>Profile</a>
        </Link>
        <Link href='/settings'>
          <a className='font-bold'>Setting</a>
        </Link>
        
      </div>
      <div className='w-[33%] flex justify-end items-center'>
        {session ? 
          <DropdownMenu session={session} signOut={signOut}/>
        :
          <Link className='bg-red-500' href="/login">
            <a>Login</a>
          </Link>
        }
      </div>
    </header>
  )
}

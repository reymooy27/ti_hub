import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link';
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import {Home, MessageCircle} from 'react-feather'

const DropdownMenu = dynamic(()=> import('./DropdownMenu'))

export default function Header() {

  const {data: session} = useSession();

  return (
    <header className="flex justify-between w-full bg-secondary h-[60px] px-6 fixed z-[3]">
      <div className='w-full flex justify-start items-center gap-5'>
        <Link href='/'>
          <Home size={26}/> 
        </Link>
        <div className='w-full'>
          <input type="text" className='w-full max-w-[300px] h-[40px] p-4 border bg-secondary text-white border-primary rounded-[15px]' />
        </div>
      </div>
      <div className='w-full flex justify-end items-center'>
        {session ? 
          <div className='flex justify-center items-center gap-5'>
            <Link href='/chats'>
              <MessageCircle size={26}/> 
            </Link>
            <Suspense>
              <DropdownMenu session={session} signOut={signOut}/>
            </Suspense>
          </div>
        :
          <Link className='bg-red-500' href="/login">
            Login
          </Link>
        }
      </div>
    </header>
  )
}

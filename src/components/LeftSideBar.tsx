import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

export default function LeftSideBar() {

  const {data: session} = useSession()
  return (
    // Profile card
    <div className="sm:block hidden w-[33%] h-full sticky top-0 overflow-y-auto">
      <div className='h-[300px] bg-secondary rounded-xl'>
        <div className='bg-red-300 rounded-xl'></div>
        <div className='flex flex-col justify-center items-center pt-6'>
          <Image className='rounded-3xl border-2 border-white border-solid' src={session?.user?.image as string} alt='Profile' height={50} width={50}/>
          <h1 className='mt-2 text-sm font-bold'>{session?.user?.name}</h1>
        </div>
      </div>
      {/* Skills */}
      <section className='mt-[10px]'>
        <div className='mb-[10px]'>
          <h3 className='font-bold'>Skills</h3>
        </div>
        <div className='flex flex-wrap gap-3'>
          <span className='bg-secondary p-3 rounded-xl'>UX Design</span>
          <span className='bg-secondary p-3 rounded-xl'>UX Design</span>
          <span className='bg-secondary p-3 rounded-xl'>UX Design</span>
          <span className='bg-secondary p-3 rounded-xl'>UX Design</span>
        </div>
      </section>
      {/* communities */}
      <section>
        <div className='mb-[10px]'>
          <h3 className='font-bold'>Communities</h3>
        </div>
          <div className="flex w-full gap-3">
            <div className="rounded w-[40px] bg-primary"></div>
            <div className='flex flex-col'>
              <h4>Ux Design Communities</h4>
              <span>32 of your friends are in</span>
            </div>
          </div>
      </section>
  </div> 
  )
}

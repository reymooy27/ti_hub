import React, { ReactElement } from 'react'
import Header from './Header'

export default function Layout({children}: {children: ReactElement}) {
  return (
    <div className='h-full w-full'>
      <Header/>
      <main className='w-full h-full pt-[70px] pb-5 flex gap-6 sm:px-6 px-[10px] relative'>
        {children}
      </main>
    </div>
  )
}

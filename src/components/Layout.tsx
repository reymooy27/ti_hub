import React from 'react'
import Header from './Header'
import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'

export default function Layout({children}) {
  return (
    <div className='h-full w-full'>
      <Header/>
      <main className='w-full h-full pt-[70px] pb-5 flex gap-6 px-6 relative'>
        <LeftSideBar/> 
        {children}
        <RightSideBar/>
      </main>
    </div>
  )
}

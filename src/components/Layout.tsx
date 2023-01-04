import React, { ReactElement } from 'react'
import Header from './Header'
import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'

export default function Layout({children}: {children: ReactElement}) {
  return (
    <div className='h-full w-full'>
      <Header/>
      <main className='w-full h-full pt-[70px] pb-5 flex gap-6 px-6 relative'>
        <LeftSideBar/> 
          <div className="sm:w-[66%] w-full h-full flex flex-col justify-start gap-3">
            {children}
          </div>
        <RightSideBar/>
      </main>
    </div>
  )
}

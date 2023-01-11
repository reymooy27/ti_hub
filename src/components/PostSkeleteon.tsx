import { Skeleton } from '@chakra-ui/react'
import React from 'react'

export default function PostSkeleteon({height}: {height?: number}) {
  return (
    <div className={`flex h-[${!height ? '150' : height}px] bg-secondary rounded-xl p-4 gap-2`} >
      <div className='flex justify-center'>
        <Skeleton width='50px' height='50px' rounded='full'/>
      </div>
      <div className='w-full flex flex-col gap-3 justify-start pt-2'>
        <Skeleton width='100px' height='15px' rounded='xl'/>
        <Skeleton width='100%' height='10px' rounded='xl'/>
        <Skeleton width='100%' height='10px' rounded='xl'/>
      </div>
    </div>
  )
}

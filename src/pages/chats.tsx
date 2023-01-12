import React from 'react'
import Layout from '../components/Layout'

export default function Chats() {
  return (
    <div className='w-full h-full flex justify-center items-center'>Chats</div>
  )
}

Chats.getLayout = function getLayout(page: React.ReactElement){
  return(
    <Layout>
      <>
        {page}
      </>
    </Layout>
  )
}
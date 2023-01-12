import React from 'react'
import Layout from '../components/Layout'

export default function Settings() {
  return (
    <div className='w-full h-full flex justify-center items-center'>Setting</div>
  )
}

Settings.getLayout = function getLayout(page: React.ReactElement){
  return(
    <Layout>
      <>
        {page}
      </>
    </Layout>
  )
}

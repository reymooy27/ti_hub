import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import { trpc } from '../../utils/trpc'

export default function Post() {

  const router = useRouter()

  const id: number = parseInt(router.query.id as string, 10)

  const post = trpc.useQuery(['post.get-post', {id}])

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      
      <div className='w-[66%] h-full'>
        {post.isLoading ? 'Loading...' :
          <>
            <h1>{post.data?.title}</h1>
            {post.data.image && <img src={post.data?.image} alt="Image" />}
          </>
        }
      </div>
    </>
  )
}

Post.getLayout = function getLayout(page: React.ReactElement){
  return(
    <Layout>
      {page}
    </Layout>
  )
}

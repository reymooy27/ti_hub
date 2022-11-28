import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { trpc } from '../utils/trpc'
import Post from './Post'
import { Session } from 'next-auth'

export default function Main({session}: {session: Session}) {

  const posts = trpc.useQuery(['post.get-all-posts'])
  // const postMutation = trpc.useMutation('post.create-post')

  const [input, setInput] = useState<string>('')
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string | Blob>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(()=>{
    if(input !== '' || selectedImage !== null){
      setIsSubmitButtonDisabled(false)
    }else{
      setIsSubmitButtonDisabled(true)
    }
  },[input])

  async function handlePost(){
    if(input !== '' || selectedImage !== null){
      setLoading(true)
      setIsSubmitButtonDisabled(true)
      const formData = new FormData()
      formData.append('imageUpload', selectedImage)
      formData.append('title', input)
      await fetch('http://localhost:3000/api/post',{
        method: 'POST',
        body: formData,
      })
      .then(res=> {
        console.log(res.json())
        setLoading(false)
        setIsSubmitButtonDisabled(false)
        setInput('')
        window.alert(res.json())
      })
      .catch(err=> {
        console.log(err)
        setLoading(false)
        setIsSubmitButtonDisabled(false)
        window.alert(err)
      })
    }

    return
  }

  return (
    <div className="w-[66%] h-full flex flex-col justify-start gap-3">
      <div className='flex w-full h-fit p-5 bg-secondary rounded-xl gap-3'>
        <div className='flex justify-start h-fit'>
          <Image alt='profile-pic' src={session?.user?.image} width={50} height={50} className='rounded-full' />
        </div>
        <div className='w-full flex flex-col gap-3'>
          <div className='flex flex-col justify-center items-center'>
            <textarea placeholder='Write anything'
              id="" cols={10} rows={3}
              className='outline-none w-full bg-transparent text-[18px] resize-none'
              value={input}
              name='title'
              onChange={(e)=> setInput(e.target.value)}
              >
            </textarea>
              {selectedImage && <div className='w-full pt-3 rounded-md relative'>
                <button 
                  className={`absolute w-[20px] bg-red-500 ${selectedImage ? 'block' : 'hidden'}`} 
                  onClick={()=> setSelectedImage('')}>Remove
                </button>
                <img className='rounded-md' alt="not fount" height={'100%'} width={"100%"} src={URL.createObjectURL(selectedImage)} />
              </div>}
          </div>
          <div className='flex w-full justify-between gap-3'>
            <div>
              <button title='Photo' className="relative rounded-xl h-[40px] p-2 bg-background">
                Photo
                <input className='absolute top-0 left-0 right-0 bottom-0 opacity-0'
                    type="file"
                    name="imageUpload"
                    title='Photo'
                    onChange={(event) => setSelectedImage(event.target.files[0])}
                  />
              </button>
            </div>
            <div className='w-[120px] self-end'>
              <button 
                disabled={isSubmitButtonDisabled}
                onClick={handlePost} 
                className={`rounded-xl w-full h-fit p-2 bg-background 
                hover:opacity-60 transition ease-in-out duration-300
                ${isSubmitButtonDisabled ? 'opacity-60' : 'opacity-100'}
                `}
                >
                  {loading ? "Loading..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {posts.isLoading ? <h1>Loading...</h1>   
      : 
        posts?.data?.length < 1 ? <h1>No Post</h1> : 
        posts.data?.map((post: any)=>(
          <Post 
            key={post.id} 
            title={post.title} 
            username={post.user.name} 
            profileImage={post.user.image} 
            image={post.image} 
            createdAt={post.createdAt}/>
        ))
      }
    </div>
  )
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image'
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { getBaseUrl } from '../pages/_app'
import { CloseButton, Spinner } from '@chakra-ui/react'

export default function TweetInput() {

  const [input, setInput] = useState<string>('')
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string | Blob>('')
  const [loading, setLoading] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {data: session} = useSession()

  useEffect(()=>{
    if(input !== '' || selectedImage !== ''){
      setIsSubmitButtonDisabled(false)
    }else{
      setIsSubmitButtonDisabled(true)
    }

  },[input, selectedImage])

  async function handlePost(){
    if(input !== '' || selectedImage !== null){
      setLoading(true)
      setIsSubmitButtonDisabled(true)
      const formData = new FormData()
      formData.append('imageUpload', selectedImage)
      formData.append('title', input)
      await fetch(`${getBaseUrl()}/api/post`,{
        method: 'POST',
        body: formData,
      })
      .then(res=> { 
        console.log(res.json())
        setLoading(false)
        setIsSubmitButtonDisabled(false)
        setInput('')
        setSelectedImage('')
        window.alert(res)
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

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    if(event.target.files !== null && event.target.files[0] !== undefined){
      const img = event.target.files[0].slice(0, event?.target?.files[0].size)
      setSelectedImage(img)
    }
  }

  function handleRemoveImageInput(){
    setSelectedImage('')
    if (fileInputRef.current !== null && fileInputRef.current !== undefined) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className='flex w-full h-fit p-5 bg-secondary rounded-xl gap-3'>
      <div className='flex justify-start h-fit'>
        <Link href={`/user/${session?.user?.id}`}>
          <a>
          <Image 
            alt='profile-pic' 
            src={session?.user?.image as string} 
            width={50} 
            height={50} 
            className='rounded-full' />
          </a>
        </Link>
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
            {selectedImage && <div className='w-full mt-3 rounded-md relative'>
              <CloseButton  
                position='absolute' 
                top={0} 
                right={0} 
                onClick={handleRemoveImageInput} 
                hidden={selectedImage !== '' ? false : true}
              />
              <img 
                className='rounded-md' 
                alt="not fount" 
                height={'100%'} 
                width={"100%"} 
                src={URL.createObjectURL(selectedImage as Blob)} />
            </div>}
        </div>
        <div className='flex w-full justify-between items-end gap-3'>
          <div className='relative w-fit h-fit'>
            <FontAwesomeIcon icon='image' width={24} className='cursor-pointer'/>
            <input className='absolute top-0 left-0 right-0 bottom-0 opacity-0'
              type="file"
              ref={fileInputRef}
              name="imageUpload"
              title='Photo'
              accept=".png, .jpg, .jpeg"
              onChange={handleImageUpload}
            />
          </div>
          <div className='w-[120px] self-end'>
            <button 
              disabled={isSubmitButtonDisabled}
              onClick={handlePost} 
              className={`rounded-xl w-full h-fit p-2 bg-primary text-black 
              hover:opacity-60 transition ease-in-out duration-300
              ${isSubmitButtonDisabled ? 'opacity-60' : 'opacity-100'}
              `}
              >
                {loading ? <Spinner className='text-background w-[14px] h-[14px]'/> : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

import {
  Modal as ModalChakraUI,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  CloseButton,
} from '@chakra-ui/react'
const FontAwesomeIcon = dynamic(()=> import('@fortawesome/react-fontawesome').then(module=> module.FontAwesomeIcon))
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { getBaseUrl } from '../pages/_app'

export default function CommentButton({postId}: {postId: number}) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const {data: session} = useSession()
  const [comment, setComment] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<Blob | string>('')
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    if(comment !== '' || selectedImage !== ''){
      setIsSubmitButtonDisabled(false)
    }else{
      setIsSubmitButtonDisabled(true)
    }

  },[comment, selectedImage])

  async function handleSubmitComment(){
    if(comment !== '' || selectedImage !== null){
      setLoading(true)
      setIsSubmitButtonDisabled(true)
      const formData = new FormData()
      formData.append('imageUpload', selectedImage)
      formData.append('comment', comment)
      formData.append('userId', session?.user?.id?.toString() as string)
      formData.append('postId',postId.toString())
      await fetch(`${getBaseUrl()}/api/comment`,{
        method: 'POST',
        body: formData,
      })
      .then(res=> { 
        console.log(res.json())
        setLoading(false)
        setIsSubmitButtonDisabled(false)
        setComment('')
        setSelectedImage('')
        handleCloseModal()
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
    if (fileInputRef !== null && fileInputRef.current !== null) {
      fileInputRef.current.value = ''
    }
  }

  function handleCloseModal(){
    onClose()
    setComment('')
    setSelectedImage('')
  }

  return (
    <>
      <FontAwesomeIcon onClick={onOpen} icon='comment' width={24} className='cursor-pointer'/>
      <ModalChakraUI blockScrollOnMount={true} isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent background='#282828' textColor='white'>
          <ModalCloseButton mb={20}/> 
          <ModalBody>
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
                  <textarea placeholder='Comment here'
                    id="" cols={10} rows={3}
                    autoFocus
                    className='outline-none w-full bg-transparent text-[18px] resize-none'
                    value={comment}
                    name='comment'
                    onChange={(e)=> setComment(e.target.value)}
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
                      onClick={handleSubmitComment} 
                      className={`rounded-xl w-full h-fit p-2 bg-primary text-black
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
          </ModalBody>  
        </ModalContent>
      </ModalChakraUI>
    </> 
  )
}
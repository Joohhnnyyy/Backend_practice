import React,{useState , useRef} from 'react'
import '../style/createpost.scss'
import { usePost } from '../hooks/usePost'
import { useNavigate } from 'react-router-dom'


const CreatePost = () => {
  const [caption, setCaption] = useState("")
  const imageRef = useRef(null)
  const navigate = useNavigate()

  const {loading , createPost} = usePost()


  async function handleSubmit(e){
    e.preventDefault()
    const file = imageRef.current.files[0]
    if(!file){
      return alert("Please select an image")
    }
    try{
      await createPost(file, caption)
      navigate('/')
    }catch(err){
      console.error('create post failed', err)
      alert('Failed to create post')
    }
  }
  if(loading){
    return <main>
      <h1>Creating Post</h1>
    </main>
  }



  return (
    <main className='create-post-page'>
      <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
          <label className="post-image-label" htmlFor="post-image">Select Image</label>
          <input value={caption}
          onChange={(e)=>{setCaption(e.target.value)}}
          type="text" 
          placeholder='Enter Caption' 
          id = "post-caption" 
          name='caption'/>
          <input ref={imageRef} 
          hidden type="file" 
          placeholder='Image' 
          id="post-image" 
          name='image'/>
          <button type='submit'>Create Post</button>
        </form>
      </div>
    </main>
  )
}

export default CreatePost
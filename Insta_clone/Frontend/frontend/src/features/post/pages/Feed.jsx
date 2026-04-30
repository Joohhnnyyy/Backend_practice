import React,{useEffect} from 'react'
import '../style/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
import Nav from '../../shared/components/Nav'

const Feed = () => {

  const { feed, fetchFeed , loading ,handelLike, handleUnlike  } = usePost()
  useEffect(() => {
    fetchFeed()
  },[])

  if(loading || !feed){
    return <div>Loading...</div>
  }


  console.log(feed)
  return (
    <main className='feed-page'>
      <Nav/>
      <div className="feed">
        <div className="posts">
          {feed.map((post) => (
            <Post key={post._id} post={post} user={post.user} handelLike={handelLike} handleUnlike={handleUnlike} loading={loading}/>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Feed
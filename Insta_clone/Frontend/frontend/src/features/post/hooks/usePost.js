import { getFeed, createPost as apiCreatePost, likePost, unlikePost } from "../services/post.api";
import { useContext ,useEffect} from "react";
import { PostContext } from "../post.context.jsx";

export const usePost = () => {
  const context = useContext(PostContext);
  const {loading , setLoading, posts, setPosts, feed, setFeed} = context

  const fetchFeed = async () => {
      setLoading(true)
      try {
        const data = await getFeed()
        setFeed(data.post ?? data.posts ?? [])
      } finally {
        setLoading(false)
      }
  }


  const createPost = async (imageFile, caption) => {
    setLoading(true)
    try{
      const data = await apiCreatePost(imageFile, caption)
      setFeed((prev) => [data.post, ...(prev ?? [])])
    } finally {
      setLoading(false)
    }
  }

  const handelLike = async( postId ) =>{
    setLoading(true)
    try{
      const data = await likePost(postId)
      await fetchFeed()
      setLoading(false)
    }catch(error){
      setLoading(false)
      throw error
    }
  }

  const handleUnlike = async (postId) => {
    setLoading(true)
    try {
      const data = await unlikePost(postId)
      setLoading(false)
      await fetchFeed()
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  useEffect(() => {
    fetchFeed()
  }, [])

  return { loading, posts, feed, fetchFeed ,createPost, handelLike, handleUnlike }
}
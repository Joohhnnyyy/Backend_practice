import { createContext,useState } from "react";


export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {

  const[ loading , setLoading] = useState(false)
  const[ posts , setPosts] = useState(null)
  const [feed, setFeed] = useState(null) 
  return (<PostContext.Provider value={{ loading, setLoading, posts, setPosts, feed, setFeed }}>
    {children}
  </PostContext.Provider>
  )
};


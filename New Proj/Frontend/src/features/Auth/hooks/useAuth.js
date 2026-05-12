import { login , register , getMe , logOut} from '../services/auth.api'
import { useContext } from 'react'
import { AuthContext } from '../auth.context' 
import { useEffect } from 'react'


export const useAuth = () =>{
  const context = useContext(AuthContext)
  const { user , setUser , loading , setLoading } = context

  async function handleRegister( { username , password , email}){
    try{
      setLoading(true)
      const data = await register({username,email,password})
      setUser(data.user)
      setLoading(false)
    }
    catch(err){
      console.error(err)
      setLoading(false)
    }
  }


  async function handleLogin({username,password , email}){
    try{
      setLoading(true)
      const data = await login({username,email,password} )
      setUser(data.user)
      setLoading(false)
    }
    catch(err){
      console.error(err)
      setLoading(false)
    }
  }


  async function handleGetMe(){
    try{
      setLoading(true)
      const data = await getMe()
      setUser(data.user)
      setLoading(false)
    }
    catch(err){
      console.error(err)
      setLoading(false)
    }
  }

  async function handleLogout(){
    try{
      setLoading(true)
      await logout()
      setUser(null)
      setLoading(false)
    }
    catch(err){
      console.error(err)
      setLoading(false)
    }
  }


  useEffect(() => {
    handleGetMe()
  }, [])

  return ({
    user,
    loading,
    register:handleRegister,
    login:handleLogin,
    getMe:handleGetMe,
    logout:handleLogout
  })
}

import { BrowserRouter ,Routes ,Route} from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register' 
import Feed from './features/post/pages/Feed'
import CreatePost from './features/post/pages/CreatePost'
import Friends from './features/user/pages/Friends'


function AppRoutes(){
  return (
    <BrowserRouter>
        <Routes>
          <Route path = '/' element= {<Feed/>}/>
          <Route path = '/login' element= {<Login/>}/>
          <Route path = '/register' element= {<Register/>}/>
          <Route path = '/create-post' element= {<CreatePost/>}/>
          <Route path = '/friends' element= {<Friends/>}/>
          <Route path = '*' element= {<h1>404 Not Found</h1>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
import AppRoutes from './AppRoutes'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { PostContextProvider } from './features/post/post.context.jsx'
import { UserProvider } from './features/user/user.context.jsx'
import './style.scss'

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <PostContextProvider>
          <AppRoutes/>
        </PostContextProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default App

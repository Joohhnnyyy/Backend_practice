import {useContext} from 'react'
import { userContext } from '../user.context.jsx'

export const useUser = () => {
  const context = useContext(userContext)
  return context
}
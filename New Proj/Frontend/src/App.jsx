import React from 'react'
import { RouterProvider } from "react-router";
import { router } from "./app.router";
import FaceExpression from './features/Expression/pages/FaceExpression';
import './features/shared/global.scss'
import { AuthProvider } from './features/Auth/auth.context';
const App = () => {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      {/* <FaceExpression /> */}
      </AuthProvider>
    </div>
  )
}

export default App
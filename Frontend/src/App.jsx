import React from 'react'
import FaceExpression from './features/expressions/components/FaceExpression'
import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import "./features/shared/styles/global.scss"
import {AuthProvider} from "./features/auth/auth.context";
import { SongContext, SongProvider } from './features/Home/song.context'

const App = () => {
  return (
    <AuthProvider>
      <SongProvider>
        <RouterProvider router={router}/>
      </SongProvider>
    </AuthProvider>
  )
}

export default App
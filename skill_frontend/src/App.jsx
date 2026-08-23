import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <>
    <AppRoutes />

    <ToastContainer
      position="top-right"
      autoClose={1000}
    />
    </>
  )
}

export default App
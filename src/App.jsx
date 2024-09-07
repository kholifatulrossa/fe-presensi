import { useState } from 'react'
import './App.css'
import routes from './router/RouteList'
import { RouterProvider } from 'react-router-dom'
import '@fontsource/poppins'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={routes}/>
    </>
  )
}

export default App

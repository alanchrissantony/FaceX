import './App.css'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Header from './components/custom/header'
import { Toaster } from './components/ui/sonner'

function App() {
  const {user, isLoaded, isSignedIn} = useUser()

  if(!isSignedIn && isLoaded){
    return <Navigate to={'/auth/sign-in'}/>
  }
  return (
    <>
      <Header/>
      <Outlet/>
      <Toaster />
    </>
  )
}

export default App

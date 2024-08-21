import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
    const {user, isSignedIn} = useUser()
  return (
    <div className='p-3 px-5 flex justify-between shadow-md'>
        <img src="/logo.svg" width={48} height={48} alt="" />

        {isSignedIn ? 
            <div className='flex gap-2 items-center'>
                <Link to={'/'}>
                    <Button variant='outline'>Dashboard</Button>
                </Link>
                
                <UserButton/>
            </div> :

            <Link to={'/auth/sign-in'}>
                <Button>Get Started</Button>
            </Link>
        }
        
        
    </div>
  )
}

export default Header
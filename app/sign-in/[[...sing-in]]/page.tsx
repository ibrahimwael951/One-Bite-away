import React from 'react'
import { SignIn } from '@clerk/nextjs'
export default function page() {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <SignIn /> 
    </div>
  )
}
 
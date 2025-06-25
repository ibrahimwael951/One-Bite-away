import React from 'react'
import { SignUp } from '@clerk/nextjs'
export default function Page() {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <SignUp />
    </div>
  )
}

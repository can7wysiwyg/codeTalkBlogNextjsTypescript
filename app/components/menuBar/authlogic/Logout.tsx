'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

export default function Logout() {
  const handleLogout = async () => {
    try {
      await signOut({ 
        redirect: true,
        callbackUrl: '/' 
      })
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <div>
      <p 
        className="nav-link" 
        onClick={handleLogout} 
        style={{cursor: "pointer"}}
      >
        Logout
      </p>
    </div>
  )
}
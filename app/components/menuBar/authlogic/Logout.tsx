'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

export default function Logout() {
    
  const handleLogout = async () => {
        try {
          await signOut({ redirect: false }); 
          

          window.location.href = "/"
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };
    
   


  return (
    <div>

<p className="nav-link text-white px-0" onClick={handleLogout}>
      Logout
    </p>

    </div>
  )
}

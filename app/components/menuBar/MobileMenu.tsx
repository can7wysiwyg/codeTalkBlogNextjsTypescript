import Link from 'next/link'
import React from 'react'

export default function MobileMenu() {
  return (
    <>
     {/* start of mobile-nav */}
  <header className="mobile-nav pt-4">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-6">
          <Link href="/">
            hoi
            {/* <img src={Logo} alt="" /> */}
          </Link>
        </div>
        <div className="col-6 text-right">
          <button className="nav-toggle bg-transparent border text-white">
            <span className="fas fa-bars"></span>
          </button>
        </div>
      </div>
    </div>
  </header>
  <div className="nav-toggle-overlay"></div>
  {/* end of mobile-nav */}

    
    
    
    </>
  )
}

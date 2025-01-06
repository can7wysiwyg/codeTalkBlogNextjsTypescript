// import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <>

<footer className="bg-dark mt-5">
  <div className="container section">
    <div className="row">
      <div className="col-lg-10 mx-auto text-center">
        {/* <Link className="d-inline-block mb-4 pb-2" href="/">
          <img
            
            decoding="async"
            className="img-fluid"
            src="images/logo-white.png"
            alt="CodeTalk"
          />
        </Link> */}
        {/* <ul className="p-0 d-flex navbar-footer mb-0 list-unstyled">
          <li className="nav-item my-0">
            <Link className="nav-link" href="about.html">
              About
            </Link>
          </li>
          <li className="nav-item my-0">
            <a className="nav-link" href="privacy-policy.html">
              Privacy Policy
            </a>
          </li>
          <li className="nav-item my-0">
            <Link className="nav-link" href="terms-conditions.html">
              Terms Conditions
            </Link>
          </li>
          
        </ul> */}
      </div>
    </div>
  </div>
  <div className="copyright bg-dark content">
     Developed By{" "}
    <a href="/">MercuryWeb </a>
  </div>
</footer>

    
    

    
    </>
  )
}

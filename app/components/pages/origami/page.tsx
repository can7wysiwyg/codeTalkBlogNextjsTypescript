// 'use client'
import Image from 'next/image'
import React from 'react'
import ArRight from "./arrow-right.png"
import { LoginAdmin } from '@/action/admin'
import { getSession } from '@/db/getSession'
import { redirect } from 'next/navigation'

export default  function Login() {

    // const session = await getSession()

    // if(session) redirect('/')


  return (
    <>

<div className="container py-4 my-5">
  
  <div className="row">
    <div className="col-md-10">
      <div className="contact-form bg-dark">
        <h4 className="text-white add-letter-space mb-5">Login</h4>
        <form action={LoginAdmin} className="needs-validation" noValidate>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-5">
                <label htmlFor="email" className="text-black-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name='email'
                  className="form-control bg-transparent rounded-0 border-bottom shadow-none pb-15 px-0"
                  placeholder="@admin.com"
                  required
                />
                <p className="invalid-feedback">email is required!</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-5">
                <label htmlFor="password" className="text-black-300">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name='password'
                  className="form-control bg-transparent rounded-0 border-bottom shadow-none pb-15 px-0"
                  placeholder="your password"
                  required
                />
                <p className="invalid-feedback">Password is required!</p>
              </div>
            </div>
            
            <div className="col-md-12">
              <button type="submit" className="btn btn-sm btn-primary">
                Log In{" "}
                
                <Image src={ArRight} alt='submit-button-image' width={16} height={16} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

    
    
    
    </>
  )
}

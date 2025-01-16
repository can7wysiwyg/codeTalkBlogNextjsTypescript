'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'
import { LoginAdmin } from '@/action/admin'
import { useRouter } from 'next/navigation'

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button 
      className="btn btn-outline-primary" 
      type="submit" 
      disabled={pending}
    >
      {pending ? 'Logging in...' : 'Login'}
    </button>
  )
}

export default function Login() {
  const router = useRouter()
  const [error, setError] = React.useState<string>('')

  async function handleSubmit(formData: FormData) {
    try {
      const result = await LoginAdmin(formData)
      
      if (result?.error) {
        setError(result.error)
      }
      // LoginAdmin will handle the redirect if successful
    } catch (err) {
      setError('An unexpected error occurred')
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="col-lg-12 mt-4 mt-lg-0">
          <form action={handleSubmit} className="row">
            {error && (
              <div className="col-12 mb-4">
                <div className="text-red-500">{error}</div>
              </div>
            )}
            
            <div className="col-md-12">
              <label htmlFor="email" className="text-black-300">
                Email
              </label>
              <input 
                type="email" 
                className="form-control mb-4" 
                placeholder="Email" 
                name="email" 
                id="email" 
                required
              />
            </div>
            
            <div className="col-12">
              <label htmlFor="password" className="text-black-300">
                Password
              </label>
              <input 
                type="password" 
                className="form-control mb-4" 
                placeholder="password" 
                name="password" 
                id="password" 
                required
              />
            </div>
            
            <div className="col-12">
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
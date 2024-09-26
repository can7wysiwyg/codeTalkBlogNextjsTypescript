'use client'

import React, { useState } from 'react'

export default function CategoryCreate() {
    const [catName, setCatName] = useState('')

     const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        try {
         
            const response = await fetch('/api/categories/private', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({catName})
            })

            const data = await response.json()
            alert(data.msg)

            window.location.href = "/components/private/categories"

            
        } catch (error: any) {

            console.error(`there was a problem ${error}`)
            
        }


     }

  return (
    <>
    <div className="container py-4 my-5">
  
  <div className="row">
    <div className="col-md-10">
      <div className="contact-form bg-dark">
      <h4 className="text-white add-letter-space mb-5">Create New Category</h4>

      <form onSubmit={handleSubmit}  className="needs-validation" noValidate>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group mb-5">
                <label htmlFor="category" className="text-black-300">
                  Category
                </label>
                <input
                  type="text"
                  id="catName"
                  name='catName'
                  onChange={
                    (e) => setCatName(e.target.value)
                  }
                  className="form-control bg-transparent rounded-0 border-bottom shadow-none pb-15 px-0"
                  placeholder="create new category"
                  required
                />
                
              </div>
              </div>

              <div className="col-md-12">
              <button type="submit" className="btn btn-sm btn-primary">
                Submit{" "}

                <i className="fas fa-paper-plane"></i>

                
                
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

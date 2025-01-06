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

            if(!response.ok) {
              alert("there was a problem in creating the category")
            }

            const data = await response.json()
            alert(data.msg)

            window.location.href = "/components/private/categories"

            
        } catch (error: unknown) {

            console.error(`there was a problem ${error}`)
            
        }


     }

  return (
    <>
    <section className="section">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-6 mt-4 mt-lg-0">
        <h4 className=" add-letter-space mb-5 text-center">
          Create New Category
        </h4>

        <form onSubmit={handleSubmit} className="row" noValidate>
          <div className="col-md-12">
            <div className="form-group mb-5">
              
              <input
                type="text"
                id="catName"
                name="catName"
                onChange={(e) => setCatName(e.target.value)}
                className="form-control mb-4"
                placeholder="create new category"
                required
              />
            </div>
          </div>

          <div className="col-md-12 text-center">
            <button type="submit" className="btn btn-sm btn-primary">
              Submit <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

    
    </>
  )
}

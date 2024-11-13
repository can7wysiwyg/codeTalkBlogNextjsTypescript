'use client'

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'


interface Category {
    catName: string,
    id: string
}


export default function () {
    const params = useParams<{ item: string }>()
    const category =  params.item
    const[item, setItem] = useState<Category | null>(null)
    const [catName, setCatName] = useState('')


       useEffect(() => {

        const fetchCat = async() => {

            try {

                const response = await fetch(`/api/categories/public/${category}`)

                  const data = await response.json()

                  setItem(data)
                
            } catch (error: any) {

                console.log(`there was an error ${error}`)
                
            }


        }


        fetchCat()



       }, [])

      

       const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        const response = await fetch(`/api/categories/private/${category}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json'
        },
          body: JSON.stringify({catName})

        })

        if(!response.ok) {
          throw new Error(`Response status: ${response.status}`);


        }

        const data = await response.json()

        alert(data.msg)

        window.location.href = `/components/private/categories/${category}`

       }



  return (
    <>

<div className="container ">
     <div className="row">
                <div className="col-12">
                    <div className=" p-5 mb-5">
                        <div className="row no-gutters">
                            <div className="col-xl-6 border-right border-lg-0 pr-0 pr-xl-5">
                            <h1 className=" add-letter-space">{item?.catName}</h1>

                            
                            </div>

                            
                                </div>
                                </div>
                                </div>

                                {/* form comp */}

                                <div className="col-md-10">
      <div >
      <h4 className="add-letter-space mb-5">Update Category</h4>

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
        
                  required
                />
                
              </div>
              </div>

              <div className="col-md-12">
              <button type="submit" className="btn btn-sm btn-primary">
                Update{" "}

                <i className="fas fa-edit"></i>


                
                
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

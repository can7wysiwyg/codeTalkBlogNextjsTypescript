'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface Category {
    catName: string,
    _id: string
}

export default function ViewingCategories() {
    const [items, setItems] = useState<Category[] | null>(null);


    useEffect(() => {

        const fetchCategories = async() => {

           try {

            const response = await fetch('/api/categories/public')

            const data = await response.json()
            
            setItems(data)
            
           } catch (error: any) {

            console.log(`there was a problem ${error}`)
            
           }

        }


        fetchCategories()



    }, [])

    

  return (
    <>
     <div className="container py-4 my-5">
     <div className="row">
                <div className="col-12">
                    <div className="bg-dark p-5 mb-5">
                        <div className="row no-gutters">
                            <div className="col-xl-6 border-right border-lg-0 pr-0 pr-xl-5">
                            <h1 className="text-white add-letter-space">Code Talk</h1>

                            <div className="breadcrumb-wrap mt-3">
                                    <Link href="/components/private/dashboard">Dashboard</Link>
                                    <span>/</span>
                                    <span>Categories</span>
                                </div>
                            </div>

                            <div className="col-xl-6 pl-0 pl-xl-5 mt-4 mt-xl-0">
                                <div className="categores-links text-capitalize">
                                    <h3 className="text-white add-letter-space mb-3">More Categores:</h3>
                                     
                                     {
                                        Array.isArray(items) ? items?.map((item) => (
                                            <Link href={`/components/private/categories/${item._id}`} key={item._id}>{item.catName}</Link>
                                        )) : <p className="border">loading....</p>
                                     }

                                    
                                </div>
                            </div>

                        



                                </div>
                                </div>
                                </div>
                                </div>
                                </div>







     
    
    </>
  )
}

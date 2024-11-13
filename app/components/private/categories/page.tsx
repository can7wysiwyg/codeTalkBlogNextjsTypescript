'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface Category {
    catName: string,
    id: string
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
     <section className='section'>
        <div className='container'>
        <div className="col-lg-12 col-md-6">
        <div className="widget">
                    <h3 className="section-title mb-3">Categories</h3>
                    <div className="widget-body">
                      <ul className="widget-list">
                        

                                     
                                     {
                                        Array.isArray(items) ? items?.map((item) => (
                                    
                                        <li> 
                                        
                                          <Link href={`/components/private/categories/${item.id}`} key={item.id}>{item.catName}</Link> </li>
                                        )) : <p className="border">loading.... </p>

                                     }
</ul>
</div>
                                     </div>
                                     </div>

                                    
    </div>                           

</section>




     
    
    </>
  )
}

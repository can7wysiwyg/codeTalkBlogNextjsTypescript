'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface Category {
  catName: string,
  _id: string
}



export default function DropMenu() {

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
     
<li>  
{

  Array.isArray(items) ? items?.map((item) => (
    <Link href={`/categories/articles/${item._id}`} className="dropdown-item">{item.catName}</Link>

  )) : "LOADING..."

}
</li>   

    
    </>
  )
}

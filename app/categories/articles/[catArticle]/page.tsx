'use client'


import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'


export default function ArticlesByCategory() {

    // const params = useParams<{ catArticle: string }>()
    const { catArticle } = useParams(); 


    console.log(catArticle)


    const[items, setItems] = useState()

    useEffect(() => {
        
        const fetchArticles = async() => {

            const response = await fetch(`/api/artCart/${catArticle}`)

            if(!response.ok) {
                alert("there was a problem")
            }

            const data = await response.json()

            setItems(data)


        }

        fetchArticles()


    }, [])

  return (
    <div>page</div>
  )
}

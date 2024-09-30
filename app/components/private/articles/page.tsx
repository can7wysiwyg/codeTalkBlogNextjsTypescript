'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


interface Article {
    _id: string,
    articleTitle: string,
    articleImage: string,
    articleCategory: string,
    articleText: string,
    createdAt: string


}

export default function adminArticles() {

    const[items, setItems] = useState<Article[] | null>(null)

 useEffect(() => {

    const fetchArticles = async() => {

        const response = await fetch('/api/articles/public')

        if(!response.ok) {
            alert("there was a problem processing your request")
        }

        const data = await response.json()

        setItems(data)


    }

    fetchArticles()


 }, [])


 console.log(items)

  return (


<div >
      <h4 className='text-center'>view all articles</h4>
</div>
  )
}

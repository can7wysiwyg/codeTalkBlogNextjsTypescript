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


<div className="container py-auto my-auto">
  <div className="row">
    <div className="col-12">
      <div className="bg-dark p-5 mb-5">
        <div className="row no-gutters">
          <div className="col-xl-6 border-right border-lg-0 pr-0 pr-xl-5">
            <h1 className="text-white add-letter-space">Articles</h1>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* testing */}



  <div className="row justify-content-between">
    

        </div>





{/* testing  */}




  </div>


  




    

  )
}

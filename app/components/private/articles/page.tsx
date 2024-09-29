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


<div className="container vh-100 py-4 my-5"  style={{maxHeight: "100vh", overflowY: "auto"}}>
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
    {
      items?.map((item) => (
<div key={item._id} className="col-lg-7">
<div className="card post-item bg-transparent border-0 mb-5">
            <Link href="post-details.html">
                <img className='card-img-top rounded-0 ' src={item.articleImage} alt="" />

                {/* <Image src={item.articleImage} className="card-img-top rounded-0" alt={item.articleTitle} width={300} height={400} /> */}
            </Link>

  </div>
  </div>

      ))
    }
    
    

        </div>





{/* testing  */}




  </div>


  




    

  )
}

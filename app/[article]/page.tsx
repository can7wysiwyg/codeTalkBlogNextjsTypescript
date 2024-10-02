'use client'
import moment from 'moment'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'


interface Article {
  _id: string,
  articleTitle: string,
  articleImage: string,
  articleCategory: string,
  articleText: string,
  createdAt: string
}







export default function singleArticle() {
  const params = useParams<{ article: string }>()
  const[item, setItem] = useState<Article | null>(null)
  


  useEffect(() => {

    const fetchArticle = async() => {

      const response = await fetch(`/api/articles/public/${params.article}`)

      if(!response.ok) {
        alert('there was a failure in fetching this article')
      }

      const data = await response.json()

      setItem(data)




    }

    fetchArticle()


  }, [])


  



  return (
    <div className="container">
      <div className='row'>
      <div className="col-lg-8 mb-5 mb-lg-0">
      <article>
						<img loading="lazy" decoding="async" src={item?.articleImage} alt="Post Thumbnail" className="w-100" />
						<ul className="post-meta mb-2 mt-4">
							<li>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{marginRight: "5px", marginTop: "-4px"}} className="text-dark" viewBox="0 0 16 16">
									<path d="M5.5 10.5A.5.5 0 0 1 6 10h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
									<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
									<path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
								</svg> <span>{moment(item?.createdAt).format('MMM D, YYYY')}</span>
							</li>
						</ul>

            <h1> {item?.articleTitle} </h1>
						

           <div dangerouslySetInnerHTML={{ __html: item?.articleText || '' }} />


            </article>



        </div>

        {/* testing */}

        <SideBar />

{/* testing */}

      </div>




    </div>
  )
}

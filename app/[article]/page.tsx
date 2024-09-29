'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'


interface Article {
  _id: string,
  articleTitle: string,
  articleImage: string,
  articleCategory: string,
  articleText: string,
  createdAt: string
}

interface Category {
  catName: string,
  _id: string
}




export default function singleArticle() {
  const params = useParams<{ article: string }>()
  const[item, setItem] = useState<Article | null>(null)
  const [catItems, setCatItems] = useState<Category[] | null>(null);



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


  useEffect(() => {

    const fetchCategories = async() => {

       try {

        const response = await fetch('/api/categories/public')

        const data = await response.json()
        
        setCatItems(data)
        
       } catch (error: any) {

        console.log(`there was a problem ${error}`)
        
       }

    }


    fetchCategories()



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
								</svg> <span>{item?.createdAt}</span>
							</li>
						</ul>

            <h1> {item?.articleTitle} </h1>
						<ul className="post-meta mb-4">
							<li> <Link href="/categories/destination">destination</Link>
							</li>
						</ul>

           <div dangerouslySetInnerHTML={{ __html: item?.articleText || '' }} />


            </article>



        </div>

        {/* testing */}

        <div className="col-lg-4">
  <div className="widget-blocks">
    <div className="row">
      <div className="col-lg-12">
        <div className="widget">
          <div className="widget-body">
            <img
              loading="lazy"
              decoding="async"
              src="images/author.jpg"
              alt="About Me"
              className="w-100 author-thumb-sm d-block"
            />
            <h2 className="widget-title my-3">Hootan Safiyari</h2>
            <p className="mb-3 pb-2">
              Hello, I’m Hootan Safiyari. A Content writer, Developer, and Story
              teller. Working as a Content writer at CoolTech Agency. Quam nihil …
            </p>
            <a href="about.html" className="btn btn-sm btn-outline-primary">
              Know More
            </a>
          </div>
        </div>
      </div>

      <div className="col-lg-12 col-md-6">
        <div className="widget">
          <h2 className="section-title mb-3">Recommended</h2>
          <div className="widget-body">
            <div className="widget-list">
              <article className="card mb-4">
                <div className="card-image">
                  <div className="post-info">
                    <span className="text-uppercase">1 minute read</span>
                  </div>
                  <img
                    loading="lazy"
                    decoding="async"
                    src="images/post/post-9.jpg"
                    alt="Post Thumbnail"
                    className="w-100"
                  />
                </div>
                <div className="card-body px-0 pb-1">
                  <h3>
                    <a className="post-title post-title-sm" href="article.html">
                      Portugal and France Now Allow Unvaccinated Tourists
                    </a>
                  </h3>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor …
                  </p>
                  <div className="content">
                    <a className="read-more-btn" href="article.html">
                      Read Full Article
                    </a>
                  </div>
                </div>
              </article>

              <a className="media align-items-center" href="article.html">
                <img
                  loading="lazy"
                  decoding="async"
                  src="images/post/post-2.jpg"
                  alt="Post Thumbnail"
                  className="w-100"
                />
                <div className="media-body ml-3">
                  <h3 style={{ marginTop: '-5px' }}>
                    These Are Making It Easier To Visit
                  </h3>
                  <p className="mb-0 small">
                    Heading Here is an example of headings. You can use …
                  </p>
                </div>
              </a>

              <a className="media align-items-center" href="article.html">
                <span className="image-fallback image-fallback-xs">
                  No Image Specified
                </span>
                <div className="media-body ml-3">
                  <h3 style={{ marginTop: '-5px' }}>No Image specified</h3>
                  <p className="mb-0 small">
                    Lorem ipsum dolor sit amet, consectetur adipiscing …
                  </p>
                </div>
              </a>

              <a className="media align-items-center" href="article.html">
                <img
                  loading="lazy"
                  decoding="async"
                  src="images/post/post-5.jpg"
                  alt="Post Thumbnail"
                  className="w-100"
                />
                <div className="media-body ml-3">
                  <h3 style={{ marginTop: '-5px' }}>Perfect For Fashion</h3>
                  <p className="mb-0 small">
                    Lorem ipsum dolor sit amet, consectetur adipiscing …
                  </p>
                </div>
              </a>

              <a className="media align-items-center" href="article.html">
                <img
                  loading="lazy"
                  decoding="async"
                  src="images/post/post-9.jpg"
                  alt="Post Thumbnail"
                  className="w-100"
                />
                <div className="media-body ml-3">
                  <h3 style={{ marginTop: '-5px' }}>Record Ultra Smooth Video</h3>
                  <p className="mb-0 small">
                    Lorem ipsum dolor sit amet, consectetur adipiscing …
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-12 col-md-6">
        <div className="widget">
          <h2 className="section-title mb-3">Categories</h2>
          <div className="widget-body">
            <ul className="widget-list">
              

              {
                Array.isArray(catItems) ? catItems?.map((catItem) => (

                  <li>
                <Link key={catItem._id} href="/">
                  {catItem.catName}
                </Link>
              </li>


                )) : "LOADING..."
              }
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>




{/* testing */}

      </div>




    </div>
  )
}

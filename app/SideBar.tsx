'use client'
import React, { useEffect, useState } from "react";

import moment from "moment";
import Link from "next/link";

interface Category {
    catName: string,
    _id: string
  }
  


export default function SideBar() {
    const [catItems, setCatItems] = useState<Category[] | null>(null);


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
    <>

<div className="col-lg-4">
            <div className="widget-blocks">
              <div className="row">
                {/* About Me Section */}
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
                      <h2 className="widget-title my-3">Paul Kasusa</h2>
                      <p className="mb-3 pb-2">
                        Hello, I am Paul Kasusa. A Website Developer  and Tech Writer. 
                      </p>
                      <Link href="/details/about" className="btn btn-sm btn-outline-primary">
                        Know More
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Recommended Section */}
                <div className="col-lg-12 col-md-6">
                  <div className="widget">
                    <h2 className="section-title mb-3">Recommended</h2>
                    <div className="widget-body">
                      <div className="widget-list">
                        <article className="card mb-4">
                          <div className="card-image">
                            <div className="post-info">
                              <span className="text-uppercase">1 minutes read</span>
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
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor …
                            </p>
                            <div className="content">
                              <a className="read-more-btn" href="article.html">
                                Read Full Article
                              </a>
                            </div>
                          </div>
                        </article>
                        {/* Additional recommendations... */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Categories Section */}
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
    
    
    
    
    
    </>
  )
}

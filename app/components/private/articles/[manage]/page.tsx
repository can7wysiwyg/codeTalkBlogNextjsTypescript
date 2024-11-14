'use client'

import Link from 'next/link';
import { useParams } from 'next/navigation'
import React from 'react'

  

export default function page() {
    const {manage} = useParams()
    


  return (
    <div>
<section className="section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div>
              <h3 className=" text-center add-letter-space mb-5">
                MANAGE ARTICLE
              </h3>

              <div className="text-center ">
                <ul className="list-unstyled">
                  <li>
                    <Link
                      href={`/components/private/articles/${manage}/photo/${manage}`}
                      
                    >
                     UPDATE  PHOTO
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/components/private/articles/${manage}/title/${manage}`}
                      
                    >
                      
                      UPDATE TITLE 
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={`/components/private/articles/${manage}/articlecontent/${manage}`}
                      
                    >
                    
                    UPDATE ARTICLE CONTENT
                    </Link>
                  </li>
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>


    </div>
  )
}

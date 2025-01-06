'use client'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'



interface Article {
    id: string,
    articleTitle: string,
    articleImage: string,
    articleCategoryId: string,
    articleText: string,
    createdAt: string


}

export default function AdminArticles() {

    const[items, setItems] = useState<Article[] | null>(null)
    // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 8;


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


 // Pagination logic
const indexOfLastArticle = currentPage * articlesPerPage;
const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
const currentArticles = items?.slice(indexOfFirstArticle, indexOfLastArticle);

const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  return (
<div>

<section className="section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="breadcrumbs mb-4">
              {" "}
              <Link href="/">Home</Link>
              <span className="mx-1">/</span> <Link href="/">CodeTalk</Link>
              <span className="mx-1">/</span> <Link href="/">Articles</Link>
            </div>
            
          </div>

          <div className="col-lg-8 mb-5 mb-lg-0">
            <div className="row">
              {Array.isArray(currentArticles)
                ? currentArticles?.map((articleItem) => (
                    <div key={articleItem.id} className="col-md-6 mb-4">
                      <article className="card article-card article-card-sm h-100">
                        <div className="card-image">
                          <div className="post-info">
                            {" "}
                            <span className="text-uppercase">{moment(articleItem.createdAt).format('MMM D, YYYY')}</span>
                            
                          </div>
                          <Image
                            loading="lazy"
                            decoding="async"
                            src={articleItem.articleImage}
                            alt="Post Thumbnail"
                            className="w-100 cart-image"
                            width="420"
                            height="280"
                          />
                        </div>

                        <div className="card-body px-0 pb-0">
                          
                          <h2>
                            <Link className="post-title" href={`/${articleItem.id}`}>
                             {articleItem.articleTitle}
                            </Link>
                          </h2>
                          <p className="card-text">
                            Heading Here is example of hedings. You can use this
                            heading by following markdownify rules. For example:
                            use # for …
                          </p>
                          <div className="content">
                            {" "}
                            <a
                              className="read-more-btn"
                              href={`/components/private/articles/${articleItem.id}`}
                            >
                              manage article
                            </a>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))
                : "LOADING..."}
            </div>

            {/* Pagination */}

<PaginationComp
         articlesPerPage={articlesPerPage}
         totalArticles={items?.length ?? 0}
         paginate={paginate}
         currentPage={currentPage}
        
        
        />
        

        {/* pagination ends */}


           

          </div>

          
          


        </div>
      </div>
    </section>


    
</div>
  )
}


const PaginationComp = ({
    articlesPerPage,
    totalArticles,
    paginate,
    currentPage,
  }: {
    articlesPerPage: number;
    totalArticles: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
  }) => {
  
    const pageNumbers: number[] = [];
    for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="col-12">
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            {/* Left Arrow */}
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <a
                className="page-link"
                href="#!"
                aria-label="Previous"
                onClick={() => paginate(currentPage - 1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                  />
                </svg>
              </a>
            </li>
  
            {/* Page Numbers */}
            {pageNumbers.map((number) => (
              <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                <a
                  href="#!"
                  className="page-link"
                  onClick={() => paginate(number)}
                >
                  {number}
                </a>
              </li>
            ))}
  
            {/* Right Arrow */}
            <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
              <a
                className="page-link"
                href="#!"
                aria-label="Next"
                onClick={() => paginate(currentPage + 1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
  
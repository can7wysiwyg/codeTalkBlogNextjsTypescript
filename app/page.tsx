'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Article {
  _id: string,
  articleTitle: string,
  articleImage: string,
  articleCategory: string,
  articleText: string,
  createdAt: Date
}


export default function Home() {
  const[articleItems, setArticleItems] = useState<Article[] | null>(null)


  useEffect(() => {

    const fetchArticles = async() => {

      const response = await fetch('/api/articles/public')

      if(!response.ok) {
        alert('there was a problem')
      }

        const data = await response.json()

        setArticleItems(data)


    }

    fetchArticles()



  }, [])

  return (
    <main>
      <div className="container">
        <div className="row no-gutters-lg">
          {/* Main Articles Section */}
          <div className="col-lg-8 mb-5 mb-lg-0">
            <h2 className="section-title">Latest Articles</h2>
            <div className="row">

              {
                Array.isArray(articleItems) ? articleItems?.map((articleItem) => (

                  <div className="col-12 mb-4">
                <article className="card article-card">
                  <a href="article.html">
                    <div className="card-image">
                      <div className="post-info">
                        <span className="text-uppercase">04 Jun 2021</span>
                        <span className="text-uppercase">3 minutes read</span>
                      </div>
                      <img
                        loading="lazy"
                        decoding="async"
                        src={articleItem.articleImage}
                        alt="Post Thumbnail"
                        className="w-100"
                      />
                    </div>
                  </a>
                  <div className="card-body px-0 pb-1">
                    <ul className="post-meta mb-2">
                      <li>
                        <a href="#!">travel</a>
                        <a href="#!">news</a>
                      </li>
                    </ul>
                    <h2 className="h1">
                      <a className="post-title" href="article.html">
                        {articleItem.articleTitle}
                      </a>
                    </h2>
                    <p className="card-text" >
                    
                      <ShowPartialArticle articleItem={articleItem} />
                    </p>
                    <div className="content">
                      <Link className="read-more-btn" href="article.html">
                        Read Full Article
                      </Link>
                    </div>
                  </div>
                </article>
              </div>




                )) : "LOADING..."
              }
              
{/*  */}






{/*  */}
            </div>
          </div>

          {/* Sidebar Section */}
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
                      <h2 className="widget-title my-3">Hootan Safiyari</h2>
                      <p className="mb-3 pb-2">
                        Hello, I’m Hootan Safiyari. A Content writer, Developer, and Storyteller. Working as a Content writer at CoolTech Agency. Quam nihil …
                      </p>
                      <a href="about.html" className="btn btn-sm btn-outline-primary">
                        Know More
                      </a>
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
                        <li>
                          <a href="#!">
                            computer <span className="ml-auto">(3)</span>
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            cruises <span className="ml-auto">(2)</span>
                          </a>
                        </li>
                        {/* More categories... */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="col-12">
          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <a className="page-link" href="#!" aria-label="Pagination Arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
                    <path
                      fillRule="evenodd"
                      d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                    />
                  </svg>
                </a>
              </li>
              <li className="page-item active">
                <a href="index.html" className="page-link">
                  1
                </a>
              </li>
              <li className="page-item">
                <a href="#!" className="page-link">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#!" aria-label="Pagination Arrow">
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
      </div>
    </main>
  );
}



const ShowPartialArticle = ({ articleItem }: { articleItem: Article }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const { articleText } = articleItem;
  const maxChars = 150;

  const shouldShowSeeMore = articleText.length > maxChars;

  return (
    <>
      {isExpanded ? (
        <span dangerouslySetInnerHTML={{ __html: articleText }} />
      ) : (
        <span dangerouslySetInnerHTML={{ __html: articleText.slice(0, maxChars) }} />
      )}
      {shouldShowSeeMore && (
        <span onClick={toggleExpansion}>
          {isExpanded ? (
            ""
          ) : (
            <Link href={`/post_single/${articleItem._id}`}>see more</Link>
          )}
        </span>
      )}
    </>
  );
};

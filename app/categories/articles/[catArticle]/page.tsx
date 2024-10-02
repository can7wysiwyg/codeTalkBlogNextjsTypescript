"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import moment from "moment";

interface Article {
  _id: string;
  articleTitle: string;
  articleImage: string;
  articleCategory: string;
  articleText: string;
  createdAt: Date;
}

interface Category {
  catName: string;
  _id: string;
}

interface CatSingle {
  catName: string;
}

export default function ArticlesByCategory() {
  const { catArticle } = useParams();
  const [articleItems, setArticleItems] = useState<Article[] | null>(null);
  const [catItems, setCatItems] = useState<Category[] | null>(null);
  const [catItem, setCatItem] = useState<CatSingle | null>(null);
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 2;


  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch(`/api/artCart/${catArticle}`);

      if (!response.ok) {
        alert("there was a problem");
      }

      const data = await response.json();

      setArticleItems(data);
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories/public");

        const data = await response.json();

        setCatItems(data);
      } catch (error: any) {
        console.log(`there was a problem ${error}`);
      }
    };

    const fetchCat = async () => {
      const response = await fetch(`/api/categories/public/${catArticle}`);

      if (!response.ok) {
        alert("there was a problem");
      }

      const data = await response.json();

      setCatItem(data);
    };

    fetchCategories();
    fetchCat();
  }, []);


  // Pagination logic
const indexOfLastArticle = currentPage * articlesPerPage;
const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
const currentArticles = articleItems?.slice(indexOfFirstArticle, indexOfLastArticle);

const paginate = (pageNumber: any) => setCurrentPage(pageNumber);


  return (
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
            <h1 className="mb-4 border-bottom border-primary d-inline-block">
              {catItem?.catName}
            </h1>
          </div>

          <div className="col-lg-8 mb-5 mb-lg-0">
            <div className="row">
              {Array.isArray(currentArticles)
                ? currentArticles?.map((articleItem) => (
                    <div key={articleItem._id} className="col-md-6 mb-4">
                      <article className="card article-card article-card-sm h-100">
                        <div className="card-image">
                          <div className="post-info">
                            {" "}
                            <span className="text-uppercase">{moment(articleItem.createdAt).format('MMM D, YYYY')}</span>
                            
                          </div>
                          <img
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
                            <Link className="post-title" href={`/${articleItem._id}`}>
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
                              href={`/${articleItem._id}`}
                            >
                              Read Full Article
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
         totalArticles={articleItems?.length}
         paginate={paginate}
         currentPage={currentPage}
        
        
        />
        

        {/* pagination ends */}


           

          </div>

           

          <div className="col-lg-4">
  <div className="widget-blocks">
    <div className="row">

    <div className="col-lg-12">
        <div className="widget">
          <div className="widget-body">
            <img loading="lazy" decoding="async" src="images/author.jpg" alt="About Me" className="w-100 author-thumb-sm d-block" />
            <h2 className="widget-title my-3">Hootan Safiyari</h2>
            <p className="mb-3 pb-2">Hello, I’m Hootan Safiyari. A Content writter, Developer and Story teller. Working as a Content writter at CoolTech Agency. Quam nihil …</p> <a href="about.html" className="btn btn-sm btn-outline-primary">Know
              More</a>
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
            <img loading="lazy" decoding="async" src="images/post/post-9.jpg" alt="Post Thumbnail" className="w-100" />
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

        <a className="media align-items-center" href="article.html">
          <img loading="lazy" decoding="async" src="images/post/post-2.jpg" alt="Post Thumbnail" className="w-100" />
          <div className="media-body ml-3">
            <h3 style={{ marginTop: '-5px' }}>These Are Making It Easier To Visit</h3>
            <p className="mb-0 small">Heading Here is example of headings. You can use …</p>
          </div>
        </a>

        <a className="media align-items-center" href="article.html">
          <span className="image-fallback image-fallback-xs">No Image Specified</span>
          <div className="media-body ml-3">
            <h3 style={{ marginTop: '-5px' }}>No Image specified</h3>
            <p className="mb-0 small">Lorem ipsum dolor sit amet, consectetur adipiscing …</p>
          </div>
        </a>

        <a className="media align-items-center" href="article.html">
          <img loading="lazy" decoding="async" src="images/post/post-5.jpg" alt="Post Thumbnail" className="w-100" />
          <div className="media-body ml-3">
            <h3 style={{ marginTop: '-5px' }}>Perfect For Fashion</h3>
            <p className="mb-0 small">Lorem ipsum dolor sit amet, consectetur adipiscing …</p>
          </div>
        </a>

        <a className="media align-items-center" href="article.html">
          <img loading="lazy" decoding="async" src="images/post/post-9.jpg" alt="Post Thumbnail" className="w-100" />
          <div className="media-body ml-3">
            <h3 style={{ marginTop: '-5px' }}>Record Ultra Smooth Video</h3>
            <p className="mb-0 small">Lorem ipsum dolor sit amet, consectetur adipiscing …</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>


      



    </div>

    </div>
    </div>


        </div>
      </div>
    </section>
  );
}


const PaginationComp = ({
  articlesPerPage,
  totalArticles,
  paginate,
  currentPage,
}: {
  articlesPerPage: number;
  totalArticles: any;
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

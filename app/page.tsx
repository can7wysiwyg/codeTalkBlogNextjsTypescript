'use client';

import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Image from "next/image";



interface Article {
  id: string;
  articleTitle: string;
  articleImage: string;
  articleCategoryId: string;
  articleText: string;
  createdAt: Date;
}

export default function Home() {
  const [articleItems, setArticleItems] = useState<Article[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch("/api/articles/public");

      if (!response.ok) {
        alert("there was a problem");
      }

      const data = await response.json();
      setArticleItems(data);
    };

    fetchArticles();
  }, []);

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articleItems?.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const sortedArticles = [...currentArticles || []].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Function to handle article click
  const handleArticleClick = (articleCategoryId: string) => {
    localStorage.removeItem("articleCategoryId"); // Clear previous ID
    localStorage.setItem("articleCategoryId", articleCategoryId); // Store new ID
  };

  return (
    <main>
      <div className="container">
        <div className="row no-gutters-lg">
          {/* Main Articles Section */}
          <div className="col-lg-8 mb-5 mb-lg-0">
            <h2 className="section-title">Latest Articles</h2>
            <div className="row">
              {Array.isArray(sortedArticles) ? (
                sortedArticles?.map((articleItem) => (
                  <div key={articleItem.id} className="col-12 mb-4">
                    <article className="card article-card">
                      {/* Add onClick to the link */}
                      <Link
                        href={`${articleItem.id}`}
                        onClick={() => handleArticleClick(articleItem.articleCategoryId)}
                      >
                        <div className="card-image">
                          <div className="post-info">
                            <span className="text-uppercase">
                              {moment(articleItem.createdAt).format("MMM D, YYYY")}
                            </span>
                          </div>

                          <Image
                            loading="lazy"
                            decoding="async"
                            src={articleItem.articleImage}
                            alt="Post Thumbnail"
                            className="w-100 panoramic-image"
                            width={100}
                            height={100}
                          />
                        </div>
                      </Link>
                      <div className="card-body px-0 pb-1">
                        <ul className="post-meta mb-2">
                          <li>
                            <span>CodeTalk</span> / <span>Articles</span>
                          </li>
                        </ul>
                        <h2 className="h1">
                          <Link
                            className="post-title"
                            href={`${articleItem.id}`}
                            onClick={() => handleArticleClick(articleItem.articleCategoryId)}
                          >
                            {articleItem.articleTitle}
                          </Link>
                        </h2>
                        <p className="card-text">
                          {/* Assuming ShowPartialArticle component renders part of the article */}
                          <ShowPartialArticle articleItem={articleItem} />
                        </p>
                        <div className="content">
                          <Link
                            className="read-more-btn"
                            href={`${articleItem.id}`}
                            onClick={() => handleArticleClick(articleItem.articleCategoryId)}
                          >
                            Read Full Article
                          </Link>
                        </div>
                      </div>
                    </article>
                  </div>
                ))
              ) : (
                "LOADING..."
              )}
            </div>
          </div>

          {/* Sidebar Section */}
          <SideBar />

        </div>

        {/* Pagination */}
        <PaginationComp
          articlesPerPage={articlesPerPage}
          totalArticles={articleItems?.length ?? 0}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </main>
  );
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
            <Link href={`${articleItem.id}`}>see more</Link>
          )}
        </span>
      )}
    </>
  );
};

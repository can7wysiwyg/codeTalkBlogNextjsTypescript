"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";


interface Article {
  id: string;
  articleTitle: string;
  articleImage: string;
  articleCategoryId: string; 
  articleText: string;
  createdAt: Date;
}

interface Category {
  catName: string;
  _id: string;
}

export default function SideBar() {
  const [catItems, setCatItems] = useState<Category[] | null>(null);
  const [articleItems, setArticleItems] = useState<Article[] | null>(null);
  const [recommendedArticles, setRecommendedArticles] = useState<Article[]>([]);

  
  useEffect(() => {
    // Fetch all articles
    const fetchArticles = async () => {
      const response = await fetch("/api/articles/public");
  
      if (!response.ok) {
        alert("There was a problem");
        return;
      }
  
      const data = await response.json();
      setArticleItems(data);
  
      const storedCategoryId = localStorage.getItem("articleCategoryId");
  
      if (storedCategoryId) {
       
        const filteredArticles = data.filter(
          (article: Article) => article.articleCategoryId === storedCategoryId
        );
  
       
        const findMiddleArticles = (articles: Article[]) => {
          if (articles.length < 3) return articles; 
          const midIndex = Math.floor(articles.length / 2);
          return articles.slice(midIndex - 1, midIndex + 2); 
        };
  
        
        setRecommendedArticles(findMiddleArticles(filteredArticles));
      } else {
        
        const sortedArticles = [...data].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setRecommendedArticles(sortedArticles.slice(0, 3));
      }
    };
  
    fetchArticles();
  }, []);
  

  useEffect(() => {
  
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories/public");
        const data = await response.json();
        setCatItems(data);
      } catch (error: unknown) {
        console.log(`There was a problem ${error}`);
      }
    };

    fetchCategories();
  }, []);

  console.log(articleItems)

  return (
    <div className="col-lg-4">
      <div className="widget-blocks">
        <div className="row">
          {/* About Me Section */}
          <div className="col-lg-12">
            <div className="widget">
              <div className="widget-body">
                {/* <Image
                  loading="lazy"
                  decoding="async"
                  src="https://cdn.britannica.com/82/93182-050-E03416A7/Marilyn-Monroe.jpg"
                  alt="About Me"
                  className="w-100 author-thumb-sm d-block"
                  width={100}
                  height={100}
                /> */}
                <h2 className="widget-title my-3">Paul Kasusa</h2>
                <p className="mb-3 pb-2">
                  Hello, I am Paul Kasusa. A Website Developer and Tech Writer.
                </p>
                <Link
                  href="/details/about"
                  className="btn btn-sm btn-outline-primary"
                >
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
                  {recommendedArticles.length > 0 ? (
                    recommendedArticles.map((article) => (
                      <article key={article.id} className="card mb-4">
                        <div className="card-image">
                          <Image
                            loading="lazy"
                            decoding="async"
                            src={article.articleImage}
                            alt="Post Thumbnail"
                            className="w-100"
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className="card-body px-0 pb-1">
                          <h3>
                            <Link
                              href={`/${article.id}`}
                              className="post-title post-title-sm"
                            >
                              
                              {article.articleTitle}
                            </Link>
                          </h3>
                          <p
                            className="card-text"
                            dangerouslySetInnerHTML={{
                              __html: article.articleText.slice(0, 100) + "...",
                            }}
                          ></p>
                          <div className="content">
                            <Link
                              href={`/${article.id}`}
                              className="read-more-btn"
                            >
                              Read Full Article
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))
                  ) : (
                    <p>No recommended articles available</p>
                  )}
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
                  {Array.isArray(catItems)
                    ? catItems.map((catItem) => (
                        <li key={catItem._id}>
                          <Link
                            href={`/categories/articles/${catItem._id}`}
                          >
                            {catItem.catName}
                          </Link>
                        </li>
                      ))
                    : "LOADING..."}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


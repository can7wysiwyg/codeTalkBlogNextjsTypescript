"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

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
              {Array.isArray(articleItems)
                ? articleItems?.map((articleItem) => (
                    <div key={articleItem._id} className="col-md-6 mb-4">
                      <article className="card article-card article-card-sm h-100">
                        <div className="card-image">
                          <div className="post-info">
                            {" "}
                            <span className="text-uppercase">04 Jun 2021</span>
                            <span className="text-uppercase">
                              3 minutes read
                            </span>
                          </div>
                          <img
                            loading="lazy"
                            decoding="async"
                            src={articleItem.articleImage}
                            alt="Post Thumbnail"
                            className="w-100"
                            width="420"
                            height="280"
                          />
                        </div>

                        <div className="card-body px-0 pb-0">
                          <ul className="post-meta mb-2">
                            <li>
                              {" "}
                              <a href="#!">travel</a>
                              <a href="#!">news</a>
                            </li>
                          </ul>
                          <h2>
                            <a className="post-title" href="article.html">
                             {articleItem.articleTitle}
                            </a>
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
                              href="/articles/travel/post-1/"
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

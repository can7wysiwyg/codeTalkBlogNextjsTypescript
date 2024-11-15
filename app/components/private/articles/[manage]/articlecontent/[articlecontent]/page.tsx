"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import React Quill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface Article {
  articleText: string;
}

export default function Page() {
  const params = useParams<{ articlecontent: string }>();
  const articlecontent = params.articlecontent;
  const [item, setItem] = useState<Article | null>(null);
  const [articleText, setArticleText] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/public/${articlecontent}`);

        if (!response.ok) {
          alert("There was a failure in fetching this article");
          return;
        }

        const data = await response.json();
        setItem(data);
        setArticleText(data.articleText); // Set the initial value for the editor
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [articlecontent]);

  const handleInputChange = (value: string) => {
    setArticleText(value); // Update the articleText state directly
  };

  const updateArticle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/articles/private/${articlecontent}/articlecontent/${articlecontent}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ articleText }),
        }
      );

      if (!response.ok) {
        alert(`Failed to update the article. Status: ${response.status}`);
        return;
      }

      const data = await response.json();
      alert(data.msg);
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-start">
      <div className="row justify-content-center">
        <div className="contact-form  p-4">
          <h4 className="add-letter-space mb-4">Update Article</h4>
          <form
            onSubmit={updateArticle}
            className="needs-validation"
            noValidate
          >
            <div className="col-md-12 ">
              <div className="form-group mb-4">
                <ReactQuill
                  value={articleText} // Controlled value
                  onChange={handleInputChange} // Updates the `articleText` state
                  className="bg-transparent"
                  theme="snow"
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline"],
                      [{ color: [] }, { background: [] }],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                  style={{ height: "300px", maxHeight: "500px" }} // Adjust height for the editor
                />
              </div>
            </div>

            <div className="col-md-12 text-center">
              <br></br>

              <br></br>
              <button
                type="submit"
                className="btn btn-primary btn-lg mt-3"
                style={{ zIndex: 1 }}
              >
                Update Article <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

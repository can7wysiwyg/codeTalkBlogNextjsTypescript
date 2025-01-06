'use client'

import { useParams } from "next/navigation";
import React, {  useState } from "react";

export default function Page() {
  const params = useParams<{ title: string }>();
  const title = params.title;
  const [articleTitle, setArticleTitle] = useState("");


  const updateTitle = async(e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    try {
      const response = await fetch(
        `/api/articles/private/${title}/title/${title}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ articleTitle }),
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





  }




  return (
    <div>

<form onSubmit={updateTitle}  className="needs-validation" noValidate>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group mb-5">
                <label htmlFor="category" className="text-black-300">
                  Update Article Title
                </label>
                <input
                  type="text"
                  id="articleTitle"
                  name='articleTitle'
                  onChange={
                    (e) => setArticleTitle(e.target.value)
                  }
                  className="form-control bg-transparent rounded-0 border-bottom shadow-none pb-15 px-0"
        
                  required
                />
                
              </div>
              </div>

              <div className="col-md-12">
              <button type="submit" className="btn btn-sm btn-primary">
                Update{" "}

                <i className="fas fa-edit"></i>


                
                
              </button>
            </div>
              </div>
              </form>
            


      
      
      
       </div>
  )
}

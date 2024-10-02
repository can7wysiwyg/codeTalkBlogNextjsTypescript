'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { redirect } from 'next/navigation';

// Dynamically import React Quill to prevent SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


interface Category {
  catName: string,
  _id: string
}


export default function ArticleUploadPage() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [text, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [message, setMessage] = useState('');
    const [items, setItems] = useState<Category[] | null>(null);


    useEffect(() => {

      const fetchCategories = async() => {

         try {

          const response = await fetch('/api/categories/public')

          const data = await response.json()
          
          setItems(data)
          
         } catch (error: any) {

          console.log(`there was a problem ${error}`)
          
         }

      }


      fetchCategories()



  }, [])



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!image) {
            setMessage('Please select an image.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('text', text); // Rich text content
        formData.append('image', image);

        try {
            const response = await fetch('/api/articles/private', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                alert('Article uploaded successfully!');
                window.location.reload()
            } else {
                setMessage(result.msg || 'Failed to upload article');
            }
        } catch (error) {
            setMessage(`Error: ${error}`);
        }
    };

    return (
      <div className="container d-flex flex-column justify-content-start">
    <div className="row justify-content-center">
        <div className="col-md-10">
            <div className="contact-form  p-4">
                <h4 className="add-letter-space mb-4">Write New Article</h4>
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group mb-4">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="form-control bg-transparent rounded-0 border-bottom shadow-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group mb-4">
                                <label htmlFor="image" >Upload Image</label>
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setImage(file);
                                        }
                                    }}
                                    className="form-control bg-transparent rounded-0 border-bottom shadow-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group mb-4">
                                <label >Article Categories</label>
                                <select
                                    className="d-block w-100 form-control bg-transparent border-bottom shadow-none"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="">Select Article Category</option>
                                    {
                                      Array.isArray(items) ? items?.map((item) => (

                                        <option value={item._id}>{item.catName}</option>


                                      )) : "LOADING..."
                                    }
                                   
                                </select>
                            </div>
                        </div>

                        <div className="col-md-12 ">
                            <div className="form-group mb-4">
                                <label htmlFor="content">Write Article</label>
                                <ReactQuill
                                    value={text}
                                    onChange={setContent}
                                    className="bg-transparent"
                                    theme="snow"
                                    style={{ height: '300px', maxHeight: '500px' }} // Adjust height for the editor
                                />
                            </div>
                        </div>
                        

                        <div className="col-md-12  text-center" >
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg mt-3"
                                style={{ zIndex: 1 }} // Make sure the button stays on top
                            >
                                Upload Article <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </form>

                
            </div>
        </div>
    </div>
</div>

        
    );
}

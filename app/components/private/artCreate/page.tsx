'use client';

import { useState } from 'react';
import { AlertHeading } from 'react-bootstrap';

export default function ArticleUploadPage() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!image) {
            setMessage('Please select an image.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('text', text);
        formData.append('image', image);

        try {
            const response = await fetch('/api/articles/private', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                alert('Article uploaded successfully!');
            } else {
                setMessage(result.msg || 'Failed to upload article');
            }
        } catch (error) {
            setMessage(`Error: ${error}`);
        }
    };

    return (

        <>

<div className="container ">
  
  <div className="row">
    <div className="col-md-10">
      <div className="contact-form bg-dark">
        <h4 className="text-white add-letter-space mb-5">Write New Article</h4>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group mb-5">
                <label htmlFor="title" className="text-black-300">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                value={title}
             onChange={(e) => setTitle(e.target.value)}

                  className="form-control bg-transparent rounded-0 border-bottom shadow-none pb-15 px-0"
                
                  required
                />
                
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group mb-5">
                <label htmlFor="password" className="text-black-300">
                 Upload Image
                </label>
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
                  
                  className="form-control bg-transparent rounded-0 border-bottom shadow-none pb-15 px-0"
                  
                  required
                />
                <p className="invalid-feedback">Password is required!</p>
              </div>
            </div>

<div className="col-md-12">
                                    <div className="form-group mb-5">
                                        <label className="text-black-300">Articles Categories</label>
                                        <select className="d-block w-100">
                                            <option value="1">Personal Proposal</option>
                                            <option value="2">Business Purpose</option>
                                            <option value="3">Want to say hello</option>
                                        </select>
                                    </div>
                                </div>



                                <div className="col-md-12">
                                    <div className="form-group mb-5">
                                        <label htmlFor="message" className="text-black-300">Your message</label>
                                        <textarea name="message" className="form-control bg-transparent rounded-0 border-bottom shadow-none pb-15 px-0" placeholder="Lorem Ipsum is simply dummy text of the printing and..." required></textarea>
                                        <p className="invalid-feedback">Message is required!</p>
                                    </div>
                                </div>         



            
            <div className="col-md-12">
              <button type="submit" className="btn btn-sm btn-primary">
                Upload Article{" "}
                <i className="fas fa-paper-plane"></i>

                
                
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

        
        
        
        
        </>
        // <div className="container mx-auto p-4">
        //     <h1 className="text-xl font-bold mb-4">Upload an Article</h1>
        //     <form onSubmit={handleSubmit} className="space-y-4">
        //         <div>
        //             <label htmlFor="title" className="block text-sm font-medium">
        //                 Title
        //             </label>
        //             <input
        //                 type="text"
        //                 id="title"
        //                 value={title}
        //                 onChange={(e) => setTitle(e.target.value)}
        //                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        //                 required
        //             />
        //         </div>

        //         <div>
        //             <label htmlFor="category" className="block text-sm font-medium">
        //                 Category
        //             </label>
        //             <input
        //                 type="text"
        //                 id="category"
        //                 value={category}
        //                 onChange={(e) => setCategory(e.target.value)}
        //                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        //                 required
        //             />
        //         </div>

        //         <div>
        //             <label htmlFor="text" className="block text-sm font-medium">
        //                 Article Text
        //             </label>
        //             <textarea
        //                 id="text"
        //                 value={text}
        //                 onChange={(e) => setText(e.target.value)}
        //                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        //                 rows={4}
        //                 required
        //             />
        //         </div>

        //         <div>
        //             <label htmlFor="image" className="block text-sm font-medium">
        //                 Upload Image
        //             </label>
        //             <input
        //                 type="file"
        //                 id="image"
        //                 accept="image/*"
        //                 onChange={(e) => {
        //                     const file = e.target.files?.[0];
        //                     if (file) {
        //                         setImage(file);
        //                     }
        //                 }}
        //                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        //                 required
        //             />
        //         </div>

        //         <button
        //             type="submit"
        //             className="px-4 py-2 bg-blue-500 text-white rounded-md"
        //         >
        //             Upload Article
        //         </button>
        //     </form>

        //     {message && <p className="mt-4 text-red-500">{message}</p>}
        // </div>
    );
}

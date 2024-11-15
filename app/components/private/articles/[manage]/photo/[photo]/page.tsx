"use client";

import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const params = useParams<{ photo: string }>();
  const photo = params.photo;
  const [image, setImage] = useState<File | null>(null);

  const updatePhoto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      alert("Image cannot be empty");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(`/api/articles/private/${photo}/photo/${photo}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      alert( data.msg);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <div className="container d-flex flex-column justify-content-start">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="contact-form p-4">
              <h4 className="add-letter-space mb-4">Update Photo</h4>
              <form onSubmit={updatePhoto} className="needs-validation" noValidate>
                <div className="col-md-12">
                  <div className="form-group mb-4">
                    
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
                <button type="submit" className="btn btn-primary">
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

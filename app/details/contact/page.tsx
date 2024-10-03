'use client';

import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),  // Sending the form data as JSON
      });

      if (response.ok) {
        setFeedback('Your message has been sent successfully!');
      } else {
        setFeedback('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setFeedback('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumbs mb-4">
                <a href="/">Home</a>
                <span className="mx-1">/</span>
                <a href="#!">Contact</a>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="pr-0 pr-lg-4">
                <div className="content">
                  Do you love my work? Get in touch and make an anonymous donation.
                  <div className="mt-5">
                    
                    <p className="mb-2">Soche, Blantyre, Malawi</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mt-4 mt-lg-0">
              <form onSubmit={handleSubmit} className="row">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control mb-4"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <textarea
                    name="message"
                    className="form-control mb-4"
                    placeholder="Type Your Message Here"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="col-12">
                  <button className="btn btn-outline-primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
              {feedback && <p className={`mt-3 ${feedback.includes('success') ? 'text-success' : 'text-danger'}`}>{feedback}</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import React from "react";

export default function About() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 ">
              <div className="breadcrumbs mb-4">
                {" "}
                <Link href="/">Home</Link>
                <span className="mx-1">/</span> <Link href="/details/about">About</Link>
              </div>
            </div>
            <div className="col-lg-8 mx-auto mb-5 mb-lg-0">
              <img
                loading="lazy"
                decoding="async"
                src="images/author.jpg"
                className="img-fluid w-100 mb-4"
                alt="Author Image"
              />
              <h1 className="mb-4">Hello, my name is Paul Kasusa</h1>
              <div className="content">
                <p>
                  I am a freelance web
                  developer from Blantyre, Malawi. With a passion for coding and
                  problem-solving, I have honed my skills independently,
                  gaining experience in modern web technologies such as React,
                  Next.js, Node.js, JavaScript and TypeScript. I work on a variety of projects,
                  including building dynamic websites, integrating cloud
                  services, and implementing state management systems. In
                  addition to my technical skills, I have a keen interest in
                  user experience and design, using Bootstrap 
                  to create responsive, user-friendly interfaces. My freelance
                  work allows me to explore innovative solutions while
                  continuously learning and improving my craft.
                </p>
                <blockquote>
                  <p>It's not enough to want something, you have to actually do the work in order earn it</p>
                </blockquote>
                <p>
                  My passion for writing tech articles stems from my
                  love for sharing knowledge and making complex programming
                  concepts easier to understand. As a self-taught developer, I
                  recognize the value of accessible learning resources, which have
                  inspired me to create a blog focused on tech and computer
                  programming. My blog serves as a platform where I can break
                  down intricate topics, provide tutorials, and offer insights
                  into modern web development practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

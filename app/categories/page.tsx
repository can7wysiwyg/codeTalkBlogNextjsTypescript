import React from 'react'

export default function page() {
  return (
    <>
    <div className="container py-4 my-5"  >
  <div className="row">
    <div className="col-lg-5 col-md-8">
      <form className="search-form" action="#">
        <div className="input-group">
          <input
            type="search"
            className="form-control bg-transparent shadow-none rounded-0"
            placeholder="Search here"
          />
          <div className="input-group-append">
            <button className="btn" type="submit">
              <span className="fas fa-search"></span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <div className="row">
    <div className="col-12">
      <div className="bg-dark p-5 mb-5">
        <div className="row no-gutters">
          <div className="col-xl-6 border-right border-lg-0 pr-0 pr-xl-5">
            <h1 className="text-white add-letter-space">Art And Photography</h1>
            <div className="breadcrumb-wrap mt-3">
              <a href="index.html">Home</a>
              <span>/</span>
              <span>Category</span>
            </div>
          </div>
          <div className="col-xl-6 pl-0 pl-xl-5 mt-4 mt-xl-0">
            <div className="categores-links text-capitalize">
              <h3 className="text-white add-letter-space mb-3">More Categories:</h3>
              <a className="border" href="#!">non quiens</a>
              <a className="border" href="#!">couat enim</a>
              <a className="border" href="#!">adicing enim</a>
              <a className="border" href="#!">quis consect</a>
              <a className="border" href="#!">aute non</a>
              <a className="border" href="#!">labois except</a>
              <a className="border" href="#!">labore nulla</a>
              <a className="border" href="#!">non quiens</a>
              <a className="border" href="#!">adicing enim</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="row justify-content-between">
    <div className="col-lg-7">
      <div className="card post-item bg-transparent border-0 mb-5">
        <a href="post-details.html">
          <img className="card-img-top rounded-0" src="images/post/post-lg/01.png" alt="" />
        </a>
        <div className="card-body px-0">
          <h2 className="card-title">
            <a className="text-white opacity-75-onHover" href="post-details.html">
              Id reprehrenderit mollit in tempor naid incididunt cupidatat consectetura
            </a>
          </h2>
          <ul className="post-meta mt-3">
            <li className="d-inline-block mr-3">
              <span className="fas fa-clock text-primary"></span>
              <a className="ml-1" href="#">24 April, 2016</a>
            </li>
            <li className="d-inline-block">
              <span className="fas fa-list-alt text-primary"></span>
              <a className="ml-1" href="#">Photography</a>
            </li>
          </ul>
          <p className="card-text my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt leo mi, viverra urna. Arcu velit risus,
            condimentum ut vulputate cursus porttitor turpis in. Diam egestas nec massa, habitasse. Tincidt dui.
          </p>
          <a href="post-details.html" className="btn btn-primary">
            Read More <img src="images/arrow-right.png" alt="" />
          </a>
        </div>
      </div>

      {/* Post Item 2 */}
      <div className="card post-item bg-transparent border-0 mb-5">
        <a href="post-details.html">
          <img className="card-img-top rounded-0" src="images/post/post-lg/02.png" alt="" />
        </a>
        <div className="card-body px-0">
          <h2 className="card-title">
            <a className="text-white opacity-75-onHover" href="post-details.html">
              Excepteur ado Do minim duis laborum Fugiat ea labore qui veniam labore
            </a>
          </h2>
          <ul className="post-meta mt-3">
            <li className="d-inline-block mr-3">
              <span className="fas fa-clock text-primary"></span>
              <a className="ml-1" href="#">24 April, 2016</a>
            </li>
            <li className="d-inline-block">
              <span className="fas fa-list-alt text-primary"></span>
              <a className="ml-1" href="#">Photography</a>
            </li>
          </ul>
          <p className="card-text my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt leo mi, viverra urna. Arcu velit risus,
            condimentum ut vulputate cursus porttitor turpis in. Diam egestas nec massa, habitasse. Tincidt dui.
          </p>
          <a href="post-details.html" className="btn btn-primary">
            Read More <img src="images/arrow-right.png" alt="" />
          </a>
        </div>
      </div>

      {/* Post Item 3 */}
      <div className="card post-item bg-transparent border-0 mb-5">
        <a href="post-details.html">
          <img className="card-img-top rounded-0" src="images/post/post-lg/03.png" alt="" />
        </a>
        <div className="card-body px-0">
          <h2 className="card-title">
            <a className="text-white opacity-75-onHover" href="post-details.html">
              Aliquip excepteur cilludm irure laboris sint ea qui ex amet </a>
              </h2>
              </div>
              </div>
              </div>
              </div>
              </div>

    
    </>
  )
}

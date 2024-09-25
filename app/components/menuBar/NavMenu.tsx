
import { getSession } from '@/db/getSession'
import Calculate from './authlogic/Calculate';
import Logout from './authlogic/Logout';



export default  async  function NavMenu() {

  const session = await getSession();


  

  return (
    
    
  <>
  <aside>
  <div className="sidenav position-sticky d-flex flex-column justify-content-between">
    <a className="navbar-brand logo" href="index.html">
      {/* <img src={Logo} alt="" /> */}
      hi
    </a>
    {/* end of navbar-brand */}

    <div className="navbar navbar-dark my-4 p-0 font-primary">
      <ul className="navbar-nav w-100">
        <li className="nav-item active">
          <a className="nav-link text-white px-0 pt-0" href="index.html">Home</a>
        </li>
        <li className="nav-item">
          <Calculate />

        </li>
        <li className="nav-item">
          <a className="nav-link text-white px-0" href="about.html">About</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white px-0" href="contact.html">Contact</a>
        </li>

        <li className="nav-item accordion">
          <div id="drop-menu" className="drop-menu collapse">
            <a className="d-block" href="index-2.html">Home 2</a>
            <a className="d-block" href="category.html">Category</a>
            <a className="d-block" href="post-details.html">Post Details</a>
            <a className="d-block" href="privacy.html">Privacy &amp; Policy</a>
          </div>
          <a
            className="nav-link text-white"
            href="#!"
            role="button"
            data-toggle="collapse"
            data-target="#drop-menu"
            aria-expanded="false"
            aria-controls="drop-menu"
          >
            Pages
          </a>
        </li>
        <li className="nav-item mt-3">
        <select
  className="custom-select bg-transparent rounded-0 text-white shadow-none"
  id="pick-lang"
  defaultValue="en"
>
  <option value="en">English</option>
  <option value="fr">French</option>
</select>

          
        </li>

        <li className="nav-item">

          {
            session ? <Logout /> : ""
          }

        </li>


      </ul>
    </div>
    {/* end of navbar */}

    <ul className="list-inline nml-2">
      <li className="list-inline-item">
        <a href="#!" className="text-white text-red-onHover pr-2">
          <span className="fab fa-twitter"></span>
        </a>
      </li>
      <li className="list-inline-item">
        <a href="#!" className="text-white text-red-onHover p-2">
          <span className="fab fa-facebook-f"></span>
        </a>
      </li>
      <li className="list-inline-item">
        <a href="#!" className="text-white text-red-onHover p-2">
          <span className="fab fa-instagram"></span>
        </a>
      </li>
      <li className="list-inline-item">
        <a href="#!" className="text-white text-red-onHover p-2">
          <span className="fab fa-linkedin-in"></span>
          {/* <FontAwesomeIcon icon={faLinkedin} /> */}
        </a>
      </li>
    </ul>
    {/* end of social-links */}
  </div>
</aside>


  
  
  </>




  
  )
}

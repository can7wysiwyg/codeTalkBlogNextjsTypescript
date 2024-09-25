
import { getSession } from '@/db/getSession'
import Calculate from './authlogic/Calculate';
import Logout from './authlogic/Logout';
import Link from 'next/link';


export default  async  function NavMenu() {

  const session = await getSession();


  

  return (
    
    
  <>
  <aside>
  <div className="sidenav position-sticky d-flex flex-column justify-content-between">
    <Link className="navbar-brand logo" href="/">
      {/* <img src={Logo} alt="" /> */}
      hi
    </Link>
    {/* end of navbar-brand */}

    <div className="navbar navbar-dark my-4 p-0 font-primary">
      <ul className="navbar-nav w-100">
        <li className="nav-item active">
          <Link className="nav-link text-white px-0 pt-0" href="/">Home</Link>
        </li>
        <li className="nav-item">
          <Calculate />

        </li>
        <li className="nav-item">
          <Link className="nav-link text-white px-0" href="/components/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white px-0" href="/components/contact">Contact</Link>
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
        <Link href="#!" className="text-white text-red-onHover pr-2">
          <span className="fab fa-twitter"></span>
        </Link>
      </li>
      <li className="list-inline-item">
        <Link href="#!" className="text-white text-red-onHover p-2">
          <span className="fab fa-facebook-f"></span>
        </Link>
      </li>
      <li className="list-inline-item">
        <Link href="#!" className="text-white text-red-onHover p-2">
          <span className="fab fa-instagram"></span>
        </Link>
      </li>
      <li className="list-inline-item">
        <Link href="#!" className="text-white text-red-onHover p-2">
          <span className="fab fa-linkedin-in"></span>
          {/* <FontAwesomeIcon icon={faLinkedin} /> */}
        </Link>
      </li>
    </ul>
    {/* end of social-links */}
  </div>
</aside>


  
  
  </>




  
  )
}

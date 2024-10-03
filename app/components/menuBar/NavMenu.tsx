import { getSession } from '@/db/getSession';
import Calculate from './authlogic/Calculate';
import Logout from './authlogic/Logout';
import Link from 'next/link';
import DropMenu from './DropMenu';

export default async function NavMenu() {
  const session = await getSession();

  return (
    <header className="navigation">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light px-0">
          <Link className="navbar-brand order-1 py-0" href="/">
            <img decoding="async" className="img-fluid" src="..." alt="CodeTalk" />
          </Link>
          <div className="navbar-actions order-3 ml-0 ml-md-4">
            <button
              aria-label="navbar toggler"
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <form action="/search" method="get" className="search order-lg-3 order-md-2 order-3 ml-auto">
            <input
              id="search-query"
              name="s"
              type="search"
              placeholder="Search..."
              autoComplete="off"
            />
          </form>
          <div className="collapse navbar-collapse text-center order-lg-2 order-4" id="navigation">
            <ul className="navbar-nav mx-auto mt-3 mt-lg-0">
              <li className="nav-item">
                <Calculate />
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/details/about">About Me</Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Articles
                </Link>
                <ul className="dropdown-menu">
                  <li><p className="dropdown-item">Select</p></li>
                  <DropMenu />
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/details/contact/">Contact</Link>
              </li>
              <li className="nav-item">
                {session ? <Logout /> : ""}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

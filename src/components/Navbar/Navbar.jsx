import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">

          {/* Sidebar toggle (mobile) */}
          <button
            className="btn btn-outline-light d-lg-none me-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarOffcanvas"
            aria-controls="sidebarOffcanvas"
          >
            ☰
          </button>

          {/* App Logo */}
          <Link className="navbar-brand fw-bold text-white" to="/dashboard">
            Contact App
          </Link>

          {/* Mobile Navbar Toggle Button */}
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}

          {/* Navbar Content */}
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >

            {/* =======================================================
                FUTURE NAVIGATION LINKS (CURRENTLY NOT USING)
            ======================================================= */}

            {/*
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/contacts"
                >
                  Contacts
                </Link>
              </li>

            </ul>
            */}

            {/* =======================================================
                FUTURE DROPDOWN MENU (CURRENTLY NOT USING)
            ======================================================= */}

            {/*
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>

              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            */}

            {/* Search Section */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

            {/* Center Search */}
            {/* <div className="mx-auto d-flex col-sm-6" role="search">
              <input
                className="form-control me-2 text-dark bg-light border-light rounded-5"
                type="search"
                placeholder="Search contacts..."
                aria-label="Search"
              />

              <button className="btn btn-outline-light" type="button">
                Search
              </button>
            </div> */}

            {/* Right: user + logout */}





            {/* <div className="d-flex align-items-center ms-auto gap-2">
              <span className="text-white small me-2">👤 USer</span>
              <button className="btn btn-danger btn-sm" type="button" onClick={onLogout}>
                Logout
              </button>
            </div> */}

          </div>
          </div>
        </div>
      </nav>

      
    </>

  );
}

export default Navbar;
import "./Header.css";
import { NavLink } from "react-router-dom";
import Logo from "../../Images/logo.jpg";

function Header() {
  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <NavLink to="/" className="logo">
            <img src={Logo} alt="logo" />
            <h1 className="text-2xl text-black font-bold">ShieldGuard</h1>
          </NavLink>
          <nav className="link-nav">
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active" : "deactive"
                  }
                >
                  Home
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/courses"
                  className={({ isActive }) =>
                    isActive ? "active" : "deactive"
                  }
                >
                  Courses
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "active" : "deactive"
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "active" : "deactive"
                  }
                >
                  Contact Us
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="/healthchat"
                  className={({ isActive }) =>
                    isActive ? "active font-bold text-yellow-400" : "deactive"
                  }
                >
                  Health Chat
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/threat-intelligence"
                  className={({ isActive }) =>
                    isActive ? "active" : "deactive"
                  }
                >
                  Threat Intelligence
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="auth-buttons">
            <NavLink to="/login">
              <button >Login</button>
            </NavLink>
            <NavLink to="/signup">
              <button>Signup</button>
            </NavLink>
            {/* <NavLink to="/admin/login">
              <button>Admin</button>
            </NavLink> */}
          </div>
        </div>
      </header>
      <div className="content-spacing"></div>{" "}
      {/* Add spacing below the navbar */}
    </>
  );
}

export default Header;

import "./Header.css";
import { NavLink } from "react-router-dom";
import Logo from "../../Images/logo.jpg";

function Header() {
  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <NavLink to="/" className="logo">
            <img src={Logo} alt="ShieldGuard Logo" className="military-icon" />
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
                  🏠 Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/healthchat"
                  className={({ isActive }) =>
                    isActive ? "active font-bold text-yellow-400" : "deactive"
                  }
                >
                  🏥 Health Chat
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/threat-intelligence"
                  className={({ isActive }) =>
                    isActive ? "active" : "deactive"
                  }
                >
                  🎯 Threat Intel
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/messaging"
                  className={({ isActive }) =>
                    isActive ? "active" : "deactive"
                  }
                >
                  📡 Secure Comms
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="auth-buttons">
            <NavLink to="/login">
              <button className="military-button">🔐 Login</button>
            </NavLink>
            <NavLink to="/signup">
              <button className="military-button">📝 Signup</button>
            </NavLink>
          </div>
        </div>
      </header>
      <div className="content-spacing"></div>
    </>
  );
}

export default Header;
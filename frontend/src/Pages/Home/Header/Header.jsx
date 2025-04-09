import "./Header.css";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../Images/logo.svg";

function Header() {
  const location = useLocation();

  return (
    <>
      <header
        className={`flex items-center justify-evenly bg-[###543c91] w-full fixed z-10 gap-[10rem] ${
          location.pathname === "/healthchat" ? "relative" : ""
        }`}
      >
        <NavLink to="/">
          <div className="logo">
            <img src={Logo} alt="logo" />
            <h1 className="text-2xl text-black font-bold">ShieldGuard</h1>
          </div>
        </NavLink>
        <div className="link-nav">
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "deactive")}
              >
                {" "}
                Home{" "}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/courses"
                className={({ isActive }) => (isActive ? "active" : "deactive")}
              >
                {" "}
                Courses{" "}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "deactive")}
              >
                {" "}
                About{" "}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "active" : "deactive")}
              >
                {" "}
                Contact us{" "}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/healthchat"
                className={({ isActive }) =>
                  isActive ? "active font-bold text-yellow-400" : "deactive"
                }
              >
                {" "}
                Health Chat{" "}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/threat-intelligence"
                className={({ isActive }) => (isActive ? "active" : "deactive")}
              >
                {" "}
                Threat Intelligence{" "}
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex gap-6">
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "deactive" : "deactive")}
          >
            <button>Login</button>
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) => (isActive ? "deactive" : "deactive")}
          >
            <button>Signup</button>
          </NavLink>
          <NavLink
            to="/admin/login"
            className={({ isActive }) => (isActive ? "deactive" : "deactive")}
          >
            <button>Admin</button>
          </NavLink>
        </div>
      </header>
      <div
        className={location.pathname === "/healthchat" ? "hidden" : ""}
      ></div>
    </>
  );
}

export default Header;

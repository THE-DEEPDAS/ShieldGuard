import React, { useState } from "react";
import HR from "../Login/Images/HR.svg";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import Radiobtn from "../Components/RadioBtn/Radiobtn";
import Header from "../Home/Header/Header";

export default function Login() {
  // State to hold user input and errors
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [userType, setUserType] = useState("");
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Client-side validation
    const newErrors = {};

    if (!Email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      newErrors.email = "Invalid email format";
    }

    if (!Password.trim()) {
      newErrors.password = "Password is required";
    }

    if (!userType) {
      newErrors.userType = "Please select user type";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Prepare data object to send to the backend
    const data = {
      Email: Email,
      Password: Password,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/${userType}/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responesData = await response.json();
      if (responesData.message != "Logged in") {
        setErr(responesData.message);
      }
      const userid = responesData.data.user._id;

      // Handle response
      if (response.ok) {
        console.log("Login successful");

        if (responesData.data.user.Isapproved === "pending") {
          if (
            responesData.data.user.Teacherdetails ||
            responesData.data.user.Studentdetails
          ) {
            navigate("/pending");
          } else {
            if (userType === "student") {
              navigate(`/StudentDocument/${userid}`);
            } else if (userType === "teacher") {
              navigate(`/TeacherDocument/${userid}`);
            }
          }
        } else if (responesData.data.user.Isapproved === "approved") {
          if (userType === "student") {
            navigate(`/Student/Dashboard/${userid}/Search`);
          } else if (userType === "teacher") {
            navigate(`/Teacher/Dashboard/${userid}/Home`);
          }
        } else if (responesData.data.user.Isapproved === "reupload") {
          if (userType === "teacher") {
            navigate(`/rejected/${userType}/${userid}`);
          } else {
            navigate(`/rejected/${userType}/${userid}`);
          }
        } else {
          setErr("Access denied - Contact command for clearance!");
        }
      } else if (response.status === 401) {
        setErrors({ password: responesData.message || "Incorrect password" });
      } else if (response.status === 403) {
        setErrors({ general: responesData.message || "Login failed" });
      } else if (response.status === 400) {
        setErrors({ general: responesData.message || "User does not exist" });
      } else if (response.status === 422) {
        setErrors({
          general: responesData.message || '"Email" must be a valid email',
        });
      } else {
        setErrors({ general: "An unexpected error occurred" });
      }
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <section className="main">
        <div className="container military-fade-in">
          <div className="para1">
            <h2>🛡️ SECURE ACCESS</h2>
          </div>

          <div className="para">
            <h5>🔐 Please authenticate your credentials</h5>
          </div>

          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="input-1">
                <input
                  type="text"
                  placeholder="📧 Military Email Address"
                  className={`input-0 military-input ${errors.email ? 'error' : ''}`}
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="error-message">⚠️ {errors.email}</div>
                )}
              </div>
              <div className="input-2">
                <input
                  type="password"
                  placeholder="🔒 Security Password"
                  className={`input-0 military-input ${errors.password ? 'error' : ''}`}
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <div className="error-message">⚠️ {errors.password}</div>
                )}
              </div>

              {/* radio buttons */}
              <div className="radio-btn">
                <Radiobtn userType={userType} setUserType={setUserType} />
                {errors.userType && (
                  <div className="error-message">⚠️ {errors.userType}</div>
                )}
              </div>

              <div className="signup-link">
                <span>🆕 New to the system? </span>
                <NavLink
                  to="/signup"
                  className="link text-yellow-400 text-semibold text-md"
                >
                  Register Here
                </NavLink>
              </div>

              <div
                className="text-yellow-400 text-semibold pt-3 cursor-pointer"
                onClick={() => navigate("/forgetpassword")}
              >
                🔑 Forgot Access Code?
              </div>

              {/* btns */}
              <div className="btns">
                <button 
                  type="submit" 
                  className={`btns-1 military-button ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? '🔄 Authenticating...' : '🚀 Access System'}
                </button>
              </div>
              {err != "" && <p className="error-message">⚠️ {err}</p>}
            </form>
          </div>
        </div>

        {/* image */}
        <div className="img-3 military-slide-in">
          <img src={HR} width={600} alt="Military Personnel" className="military-icon" />
        </div>
      </section>
    </>
  );
}
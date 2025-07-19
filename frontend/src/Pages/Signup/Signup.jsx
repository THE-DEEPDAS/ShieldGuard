import React, { useState } from "react";
import "./Styles.css";
import { NavLink, useNavigate } from "react-router-dom";
import Images from "../Images/Grammar-correction.svg";
import Radiobtn from "../Components/RadioBtn/Radiobtn";
import Header from "../Home/Header/Header";

const Signup = () => {
  // State to hold user input and errors
  const [Firstname, setFirstName] = useState("");
  const [Lastname, setLastName] = useState("");
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

    if (!Firstname.trim()) {
      newErrors.firstname = "First name is required";
    }

    if (!Lastname.trim()) {
      newErrors.lastname = "Last name is required";
    }

    if (!Email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      newErrors.email = "Invalid email format";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(Password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.";
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
      Firstname: Firstname,
      Lastname: Lastname,
      Email: Email,
      Password: Password,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${userType}/signup`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      setErr(responseData.message);

      if (response.ok) {
        console.log("Registration successful");
        navigate("/varifyEmail");
      } else if (response.status === 400) {
        setErrors(responseData.errors || {});
      } else {
        console.error("Registration failed with status code:", response.status);
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
      <div className="section">
        <article className="article military-fade-in">
          <div className="header">
            <h3 className="head">🎖️ ENLIST NOW</h3>
            <h4 className="Sub-head">🚀 Join the Elite Defense Force!</h4>
          </div>

          <div className="inpts">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className={`input-x input-4 military-input ${errors.firstname ? 'invalid' : ''}`}
                placeholder="👤 First Name"
                value={Firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstname && (
                <div className="error-message">⚠️ {errors.firstname}</div>
              )}

              <input
                type="text"
                className={`input-x input-5 military-input ${errors.lastname ? 'invalid' : ''}`}
                placeholder="👥 Last Name"
                value={Lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastname && (
                <div className="error-message">⚠️ {errors.lastname}</div>
              )}

              <input
                type="text"
                className={`input-x input-6 military-input ${errors.email ? 'invalid' : ''}`}
                placeholder="📧 Military Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="error-message">⚠️ {errors.email}</div>
              )}

              <input
                type="password"
                className={`input-x input-7 military-input ${errors.password ? 'invalid' : ''}`}
                placeholder="🔒 Security Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div className="error-message">⚠️ {errors.password}</div>
              )}

              <div className="rad-btns">
                <Radiobtn userType={userType} setUserType={setUserType} />
                {errors.userType && (
                  <div className="error-message">⚠️ {errors.userType}</div>
                )}
              </div>

              <div className="signupage">
                <span>🔐 Already have clearance? </span>
                <NavLink
                  to="/Login"
                  className="link"
                >
                  Access System
                </NavLink>
              </div>
              <div className="btn">
                <button 
                  type="submit" 
                  className={`btn-4 military-button ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? '🔄 Processing...' : '🚀 Enlist Now'}
                </button>
              </div>
            </form>
            {err && <div className="error-message">⚠️ {err}</div>}
          </div>
        </article>

        <div className="right-part military-slide-in">
          <img src={Images} alt="Military Registration" className="imgs military-icon" />
        </div>
      </div>
      <p className="text-sm text-red-400 absolute bottom-3 left-3">
        🔒 * Password must be at least 8 characters long and include an uppercase
        letter, a lowercase letter, a number, and a special character for maximum security.
      </p>
    </>
  );
};

export default Signup;
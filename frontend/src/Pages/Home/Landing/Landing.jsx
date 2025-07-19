import React, { useState } from "react";
import "./Landing.css";
import Classroom from "../../Images/Classroom.svg";
import Plant from "../../Images/Plant.svg";
import Plant2 from "../../Images/Plant2.svg";
import Contact from "../Contact/Contact.jsx";
import Footer from "../../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import { CgProfile } from "react-icons/cg";
import { IoSchoolSharp } from "react-icons/io5";
import { FaSchool } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

function Landing() {
  const [LClass, setLClass] = useState(false);
  const [EMentor, setEMentor] = useState(false);
  const [subject, setSubject] = useState("");

  const [facList, setFacList] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/Search/${subject}`);
  };

  const AA = () => {
    setEMentor(true);
    setLClass(false);
  };

  const BB = () => {
    setEMentor(false);
    setLClass(true);
  };

  const teachersList = async (sub) => {
    setLoading(true);

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/course/${sub}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    setFacList(data.data);
    setLoading(false);
  };

  return (
    <>
      <Header />
      {/* Top Section - Hero */}
      <div className="top military-fade-in">
        <div className="left military-slide-in">
          <h1>
            Empowering Defense, Securing Futures: <br />
            Your Gateway to Military Excellence with{" "}
            <span className="font-semibold text-amber-400 font-serif text-5xl military-glow">
              ShieldGuard
            </span>
          </h1>
        </div>
        <div className="right">
          <img src={Classroom} width={500} alt="Military Training" className="military-icon" />
        </div>
      </div>

      {/* Features */}
      <div className="features military-fade-in">
        <div className="military-section-header">
          <p>🎖️ Why Choose Our Defense Platform</p>
        </div>
        <div className="fets2">
          <div className="fet military-card military-pulse" onClick={AA}>
            <div className="military-icon">
              🎖️
            </div>
            <h4>Elite Military Mentors</h4>
            <p>
              Our expert military mentors are battle-tested professionals with extensive field experience. 
              They provide strategic guidance and tactical knowledge to support our personnel on their mission to excellence.
            </p>
          </div>

          <div className="fet military-card military-pulse" onClick={BB}>
            <div className="military-icon">
              🎯
            </div>
            <h4>High-Security Training Operations</h4>
            <p>
              We deliver classified-level training operations to our personnel, providing secure interactive 
              learning experiences led by experienced military instructors and defense specialists.
            </p>
          </div>

          <NavLink to="/contact">
            <div className="fet military-card military-pulse">
              <div className="military-icon">
                📡
              </div>
              <h4>24/7 Command Support</h4>
              <p>
                We offer our personnel 24/7 command support. Whether it's a tactical question or operational 
                challenge, our dedicated command team provides immediate guidance and assistance.
              </p>
            </div>
          </NavLink>
        </div>
        
        {LClass && (
          <div className="flex items-center justify-center military-fade-in">
            <div className="flex gap-5 items-center my-5 military-card">
              <img
                src="https://lh3.googleusercontent.com/kq1PrZ8Kh1Pomlbfq4JM1Gx4z-oVr3HG9TEKzwZfqPLP3TdVYrx0QrIbpR-NmMwgDzhNTgi3FzuzseMpjzkfNrdHK5AzWGZl_RtKB80S-GZmWOQciR9s=w1296-v1-e30"
                alt="Military Training"
                width={300}
                className="military-icon"
              />
              <div className="text-white flex flex-col items-center">
                <h1 className="text-military-secondary">🎯 High-Security Training Operations</h1>
                <p>
                  We deliver classified-level training operations to our personnel,
                  <br /> providing secure interactive learning experiences <br />
                  led by experienced military instructors.
                </p>
              </div>
            </div>
          </div>
        )}

        {EMentor && (
          <div className="flex items-center justify-center mt-7 gap-5 military-fade-in">
            <div className="military-card military-glow overflow-hidden flex flex-col items-center justify-center">
              <img
                className="rounded-full military-icon"
                src="https://media.istockphoto.com/id/1310210662/photo/portrait-of-indian-woman-as-a-teacher-in-sari-standing-isolated-over-white-background-stock.jpg?s=612x612&w=0&k=20&c=EMI42nCFpak1c4JSFvwfN0Qllyxt19dlihYEXAdnCXY="
                alt="Colonel Dina Sharma"
                width={200}
              />
              <div className="flex items-center justify-start">
                <CgProfile className="text-military-secondary" />
                <p>🎖️ Colonel Dina Sharma</p>
              </div>
              <div className="flex items-center">
                <FaSchool className="text-military-secondary" />
                <p>🏛️ Defense Academy</p>
              </div>
              <div className="flex items-center">
                <IoSchoolSharp className="text-military-secondary" />
                <p>🎓 Strategic Operations</p>
              </div>
            </div>
            
            <div className="military-card military-glow overflow-hidden flex flex-col items-center justify-center">
              <img
                className="rounded-full military-icon"
                src="https://media.istockphoto.com/id/1324558913/photo/confident-young-man-in-casual-green-shirt-looking-away-standing-with-crossed-arms-isolated-on.jpg?s=612x612&w=0&k=20&c=NOrKRrUuxvePKijL9sFBHlDwHESv7Van68-hoS-_4hQ="
                alt="Major Anand Mishra"
                width={200}
              />
              <div className="flex items-center justify-start">
                <CgProfile className="text-military-secondary" />
                <p>🎖️ Major Anand Mishra</p>
              </div>
              <div className="flex items-center">
                <FaSchool className="text-military-secondary" />
                <p>🏛️ Military Institute</p>
              </div>
              <div className="flex items-center">
                <IoSchoolSharp className="text-military-secondary" />
                <p>🎓 Tactical Operations</p>
              </div>
            </div>
            
            <div className="military-card military-glow overflow-hidden flex flex-col items-center justify-center">
              <img
                className="rounded-full military-icon"
                src="https://media.istockphoto.com/id/1663458254/photo/portrait-of-beautiful-indian-woman-in-sari.jpg?s=612x612&w=0&k=20&c=raeTJOEyA4sFX_GwrgboXt9ZxtAZ8RkFuljPJnL9sCU="
                alt="Captain Sunita Patel"
                width={200}
              />
              <div className="flex items-center justify-start">
                <CgProfile className="text-military-secondary" />
                <p>🎖️ Captain Sunita Patel</p>
              </div>
              <div className="flex items-center">
                <FaSchool className="text-military-secondary" />
                <p>🏛️ Defense Research</p>
              </div>
              <div className="flex items-center">
                <IoSchoolSharp className="text-military-secondary" />
                <p>🎓 Intelligence Analysis</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Courses */}
      <div className="courses military-fade-in">
        <div className="military-section-header">
          <p>🎯 Specialized Training Units</p>
        </div>
        <hr className="underLine" />
        <div className="subjects">
          <div className="subject military-card" onClick={() => teachersList("physics")}>
            <div className="military-icon">
              ⚛️
            </div>
            <p>Physics & Ballistics</p>
          </div>
          <div className="subject military-card" onClick={() => teachersList("chemistry")}>
            <div className="military-icon">
              🧪
            </div>
            <p>Chemical Defense</p>
          </div>
          <div className="subject military-card" onClick={() => teachersList("biology")}>
            <div className="military-icon">
              🧬
            </div>
            <p>Biological Warfare</p>
          </div>
          <div className="subject military-card" onClick={() => teachersList("math")}>
            <div className="military-icon">
              📊
            </div>
            <p>Strategic Mathematics</p>
          </div>
          <div className="subject military-card" onClick={() => teachersList("computer")}>
            <div className="military-icon">
              💻
            </div>
            <p>Cyber Operations</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-10">
          {!loading &&
            facList &&
            facList.map((fac) => (
              <div key={fac._id} className="military-card faculty-card">
                <div className="flex gap-3 items-center mb-2">
                  <div className="military-icon">
                    🎖️
                  </div>
                  <div className="flex flex-col justify-center items-start pl-3">
                    <p className="font-bold">
                      {fac.enrolledteacher.Firstname}{" "}
                      {fac.enrolledteacher.Lastname}
                    </p>
                    <h4 className="text-blue-900">
                      📧 {fac.enrolledteacher.Email}
                    </h4>
                  </div>
                </div>
                {fac.enrolledteacher.Email === "urttsg@gmail.com" ? (
                  <h4>
                    <span className="font-bold text-brown-800">
                      🎓 Education:
                    </span>{" "}
                    Military Academy Graduate
                  </h4>
                ) : (
                  <h4>
                    <span className="font-bold text-brown-800">
                      🎓 Education:
                    </span>{" "}
                    Defense University Graduate
                  </h4>
                )}
                {fac.enrolledteacher.Email === "urttsg@gmail.com" ? (
                  <h4>⏱️ 5 years of military training experience</h4>
                ) : (
                  <h4>⏱️ 8 years of defense operations experience</h4>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* About Us */}
      <div className="about military-fade-in">
        <div className="military-section-header">
          <h4>🛡️ About Our Mission</h4>
        </div>
        <div className="content">
          <p>
            At ShieldGuard, we believe in the power of strategic defense training to transform military operations. 
            Our platform is designed to be a gateway to tactical knowledge, offering a comprehensive range of 
            specialized training programs and operational experiences for military personnel.
          </p>
          <img src={Plant2} alt="Military Operations" className="military-icon" />
          <p>
            ShieldGuard was born out of a commitment to military excellence and a desire to make advanced 
            defense training accessible to all service members. We understand the challenges faced by modern 
            military operations and strive to provide solutions that are both secure and effective.
          </p>
          <p>
            Our mission is clear and decisive: to empower military personnel through advanced training. 
            We aim to create a global defense community where service members can enhance their tactical skills, 
            develop strategic thinking, and achieve their operational and career objectives.
          </p>
        </div>
      </div>

      {/* Contact Us */}
      <div className="contact-us military-fade-in">
        <div className="message">
          <h4>📡 Command Center</h4>
          <p>
            Have operational questions or need tactical assistance? Our command center is here to help! 
            Reach out to us anytime, and our specialized team will respond with immediate support and guidance.
          </p>
        </div>
        <div className="form">
          <input type="text" placeholder="Your Name & Rank" className="military-input" />
          <input type="email" placeholder="Your Military Email" className="military-input" />
          <textarea placeholder="Your Message" className="military-input"></textarea>
          <button className="military-button">Submit Report</button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Landing;
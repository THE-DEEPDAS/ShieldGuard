import React from "react";
import Plant from "../../Images/Plant.svg";
import Plant2 from "../../Images/Plant2.svg";
import "../Landing/Landing.css";
import Footer from "../../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";

function About({ backgroundC }) {
  return (
    <>
      <Header />
      <div className="about" style={{ backgroundColor: backgroundC }}>
        <h4>About Us</h4>
        <hr className="underLine" />
        <div className="content flex flex-row">
          {/* Left side - Image */}
          <div className="left-svg flex-shrink-0 mr-6">
            <img src={Plant2} className="w-[22rem]" alt="Decorative plant" />
          </div>
          
          {/* Right side - Text content */}
          <div className="text-content flex-grow">

          <h1 className="bg-blue-700 w-fit py-1 px-3 rounded-sm my-2">
              Our Story
            </h1>
            <p>
              At ShieldGuard, we believe in the power of education to transform
              lives. Our platform is designed to be a gateway to knowledge,
              offering a diverse range of courses and learning experiences for
              students.
            </p>
           
            <p>
              ShieldGuard was born out of a passion for learning and a desire to
              make quality education accessible to everyone. We understand the
              challenges faced by modern learners and strive to provide a solution
              that is both convenient and effective.
            </p>
            <h1 className="bg-blue-700 w-fit py-1 px-3 rounded-sm my-2">
              Our Mission
            </h1>
            <p>
              Our mission is simple yet profound: to empower individuals through
              education. We aim to create a global learning community where
              students can discover new passions, enhance their skills, and
              achieve their academic and professional goals. By leveraging
              technology and innovative teaching methods, we strive to make
              learning engaging, interactive, and enjoyable.
            </p>
          </div>
        </div>
        
        {/* Removed the right-svg div as it was causing layout issues */}
      </div>
      <Footer />
    </>
  );
}

export default About;
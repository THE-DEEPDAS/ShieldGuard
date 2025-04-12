import React from "react";
import "./BlockchainSecureCommunication.css";
import Header from "../Home/Header/Header";

export default function BlockchainSecureCommunication() {
  return (
    <>
      <Header />
      <section className="main">
        <div className="container">
          <div className="para1">
            <h2>Blockchain-Secure Communication</h2>
          </div>
          <div className="para">
            <h5>
              A bulletproof, end-to-end encrypted communication system
              leveraging blockchain to rule out interception risks, ensuring
              secure, real-time intelligence sharing for military operations.
            </h5>
          </div>
          <div className="features">
            <ul>
              <li>End-to-end encryption for secure communication.</li>
              <li>Blockchain technology to prevent interception risks.</li>
              <li>Real-time intelligence sharing for critical operations.</li>
              <li>Designed specifically for military-grade security.</li>
            </ul>
          </div>
        </div>
        <div className="img-3">
          <img
            src="/path/to/secure-communication-image.svg"
            width={600}
            alt="Secure Communication"
          />
        </div>
      </section>
    </>
  );
}

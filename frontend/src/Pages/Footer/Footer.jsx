import React from 'react';
import '../Home/Landing/Landing.css';

function Footer() {
  return (
    <div className="footer military-fade-in">
      <div className="leftPart">
        <div className="title">
          <div className="military-icon">
            🛡️
          </div>
          <h2 className="text-military-secondary font-bold">ShieldGuard</h2>
        </div>
        <p className="text-military-light">Copyright © 2024</p>
        <p className="text-military-secondary font-semibold">Protecting Those Who Protect Us</p>
        <div className="military-badge">
          CLASSIFIED OPERATIONS
        </div>
      </div>
      <div className="rightPart">
        <div className="links">
          <div className="link military-card-hover">
            <hr className="bg-military-secondary" />
            <p>🏠 Home</p>
          </div>
          <div className="link military-card-hover">
            <hr className="bg-military-secondary" />
            <p>ℹ️ About</p>
          </div>
          <div className="link military-card-hover">
            <hr className="bg-military-secondary" />
            <p>⚙️ Operations</p>
          </div>
          <div className="link military-card-hover">
            <hr className="bg-military-secondary" />
            <p>🎯 Missions</p>
          </div>
          <div className="link military-card-hover">
            <hr className="bg-military-secondary" />
            <p>📞 Contact</p>
          </div>
          <div className="link military-card-hover">
            <hr className="bg-military-secondary" />
            <p>🔒 Privacy</p>
          </div>
        </div>
        <hr className="hr bg-military-secondary" />
        <div className="icons">
          <div className="military-icon military-pulse">
            🔗
          </div>
          <div className="military-icon military-pulse">
            📡
          </div>
          <div className="military-icon military-pulse">
            🌐
          </div>
          <div className="military-icon military-pulse">
            📊
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
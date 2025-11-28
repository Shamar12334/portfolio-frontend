import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav-container">

      {/* Top Row */}
      <div className="flex justify-between items-center">
        <h1 className="nav-logo">Shamar Weekes</h1>

        {/* Desktop Links */}
        <div className="nav-links">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/about">About</Link>
          <Link className="nav-link" to="/projects">Projects</Link>
          <Link className="nav-link" to="/skills">Skills</Link>
          <Link className="nav-link" to="/contact">Contact</Link>
        </div>

        {/* Mobile Hamburger */}
        <div 
          className="nav-hamburger"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="nav-dropdown">
          <Link className="nav-link" to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link className="nav-link" to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link className="nav-link" to="/projects" onClick={() => setIsOpen(false)}>Projects</Link>
          <Link className="nav-link" to="/skills" onClick={() => setIsOpen(false)}>Skills</Link>
          <Link className="nav-link" to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
      )}

    </nav>
  );
}

export default Navbar;

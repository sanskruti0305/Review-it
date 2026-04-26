// src/components/Navbar.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  // Controls the mobile hamburger menu open/close state
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/",          label: "Feed"      },
    { to: "/movies",    label: "Movies"    },
    { to: "/books",     label: "Books"     },
    { to: "/analytics", label: "Analytics" },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar__inner">
          {/* Logo */}
          <NavLink to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
            Review-It ✦
          </NavLink>

          {/* Desktop nav links */}
          <div className="navbar__links">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  isActive ? "navbar__link active" : "navbar__link"
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/add" className="navbar__cta">
              + Write Review
            </NavLink>
          </div>

          {/* Mobile hamburger button */}
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                isActive ? "navbar__link active" : "navbar__link"
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/add" className="navbar__cta" onClick={() => setMenuOpen(false)}>
            + Write Review
          </NavLink>
        </div>
      )}
    </>
  );
}

export default Navbar;

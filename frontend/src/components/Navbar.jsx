import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const navLinks = [
    { to: "/", label: "Feed" },
    { to: "/movies", label: "Movies" },
    { to: "/books", label: "Books" },
    { to: "/analytics", label: "Analytics" },
  ];

  if (isLoggedIn) {
    navLinks.push({
      to: "/my-reviews",
      label: "My Reviews",
    });
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar__inner">

          <NavLink
            to="/"
            className="navbar__logo"
            onClick={() => setMenuOpen(false)}
          >
            Review-It ✦
          </NavLink>

          {/* Desktop Menu */}
          <div className="navbar__links">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  isActive
                    ? "navbar__link active"
                    : "navbar__link"
                }
              >
                {link.label}
              </NavLink>
            ))}

            {!isLoggedIn ? (
              <NavLink
                to="/login"
                className="navbar__link"
              >
                Login
              </NavLink>
            ) : (
              <button
                className="navbar__link"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}

            <NavLink
              to="/add"
              className="navbar__cta"
            >
              + Write Review
            </NavLink>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className="navbar__link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}

          {!isLoggedIn ? (
            <NavLink
              to="/login"
              className="navbar__link"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </NavLink>
          ) : (
            <button
              className="navbar__link"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

          <NavLink
            to="/add"
            className="navbar__cta"
            onClick={() => setMenuOpen(false)}
          >
            + Write Review
          </NavLink>
        </div>
      )}
    </>
  );
}

export default Navbar;
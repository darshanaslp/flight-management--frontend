import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/users/userSlice";
import { ThemeContext } from "../../../Context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem("email");
    setUsername(storedUsername);
  }, []);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setIsDropdownOpen(false);
  };

  return (
    <header>
      <nav
        className={`navbar navbar-expand-lg navbar-light bg-info ${
          isDarkMode ? "navbar-dark bg-dark text-light" : ""
        }`}
      >
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Fight Details App</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <div
                  className="form-check form-switch me-4"
                  style={{ marginTop: "7px" }}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    checked={isDarkMode}
                    onChange={toggleTheme}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                  </label>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={toggleDropdown}
                >
                  <FontAwesomeIcon icon={faUser} /> {username}
                </a>
                <ul
                  className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

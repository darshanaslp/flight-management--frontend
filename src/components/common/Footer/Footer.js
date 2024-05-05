import React from "react";

const Footer = ({ isDarkMode }) => {
  const footerStyle = {
    color: isDarkMode ? "white" : "black",
  };

  return (
    <footer
      className={`footer mt-auto py-3 ${isDarkMode ? "bg-dark" : "bg-info"}`}
    >
      <div className="container text-center">
        <span style={footerStyle}>
          Flight Details Manager Crerated By Darshana Perera &copy; 2024
        </span>
      </div>
    </footer>
  );
};

export default Footer;

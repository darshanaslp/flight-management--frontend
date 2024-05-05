import React, { createContext, useState } from "react";

// Create a context for the theme
export const ThemeContext = createContext();

// Create a provider component to wrap the entire app
export const ThemeProvider = ({ children }) => {
  // State to manage the theme
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle the theme
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

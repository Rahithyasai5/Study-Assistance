import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "./Navbar.css";

function Navbar() {

  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (

    <nav className="navbar">

      <div className="logo">
        📚 AI Study Assistant
      </div>

      <button
        className="theme-btn"
        onClick={toggleTheme}
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

    </nav>

  );
}

export default Navbar;
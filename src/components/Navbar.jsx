import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ setIsLoggedIn }) => {
  const [open, setOpen] = useState(false);
  const userEmail = localStorage.getItem("userEmail"); // logged-in user

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false); // will redirect via protected route
  };

  return (
    <nav className="bg-slate-800 px-6 py-4 shadow-lg shadow-slate-700/30">
      {/* TOP ROW */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="font-extrabold text-2xl flex items-center gap-2">
          <span className="text-blue-400 animate-pulse">&lt;</span>
          <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-300 via-purple-400 to-pink-400 drop-shadow-lg">
            PASS-OP ☠️
          </span>
          <span className="text-pink-400 animate-pulse">&gt;</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-lg">
          <ul className="flex gap-6">
            <li>
              <Link
                to="/"
                className="cursor-pointer hover:text-blue-300 text-white transition-all"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/About"
                className="cursor-pointer hover:text-blue-300 text-white transition-all"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/Contact"
                className="cursor-pointer hover:text-blue-300 text-white transition-all"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* User email */}
          {userEmail && (
            <div
              className="flex items-center gap-3 px-3 py-1.5 rounded-xl 
                  bg-white/10 border border-white/20 backdrop-blur-md"
            >
              <div
                className="w-8 h-8 rounded-full bg-linear-to-br 
                    from-emerald-400 to-cyan-400 
                    flex items-center justify-center text-black font-bold"
              >
                {userEmail.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-gray-200 font-medium">
                {userEmail}
              </span>
            </div>
          )}

          {/* Logout */}
          {userEmail && (
            <button
              onClick={handleLogout}
              className="cursor-pointer flex items-center gap-3 px-3 py-1.5 rounded-xl 
                  bg-white/10 border border-white/20 backdrop-blur-md hover:bg-red-500/80 transition-all duration-300"
            >
              <div className="text-sm text-gray-200 font-medium">Logout</div>

              <lord-icon
                src="https://cdn.lordicon.com/vfiwitrm.json"
                trigger="hover"
                target="button"
                colors="primary:#ffffff,secondary:#ffffff"
              ></lord-icon>
            </button>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="text-white text-3xl md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`md:hidden flex flex-col gap-4 mt-4 text-lg text-white transition-all duration-300 overflow-hidden ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <li>
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="cursor-pointer hover:text-blue-300 transition-all"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/About"
            onClick={() => setOpen(false)}
            className="cursor-pointer hover:text-blue-300 transition-all"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/Contact"
            onClick={() => setOpen(false)}
            className="cursor-pointer hover:text-blue-300 transition-all"
          >
            Contact
          </Link>
        </li>

        {userEmail && (
          <li className="mt-2 flex flex-col gap-2">
            <span className="text-white font-medium">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-400 px-3 py-1 rounded-lg text-white transition"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

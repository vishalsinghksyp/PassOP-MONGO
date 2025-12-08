import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

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

        {/* Hamburger (Mobile Only) */}
        <button
          className="text-white text-3xl md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-lg">
          <li className="cursor-pointer hover:text-blue-300 text-white transition-all">
            Home
          </li>
          <li className="cursor-pointer hover:text-blue-300 text-white transition-all">
            About
          </li>
          <li className="cursor-pointer hover:text-blue-300 text-white transition-all">
            Contact
          </li>
        </ul>
      </div>

      {/* Mobile Slide Menu */}
      <ul
        className={`md:hidden flex flex-col gap-4 mt-4 text-lg text-white transition-all duration-300 overflow-hidden ${
          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <li className="cursor-pointer hover:text-blue-300 transition-all">
          Home
        </li>
        <li className="cursor-pointer hover:text-blue-300 transition-all">
          About
        </li>
        <li className="cursor-pointer hover:text-blue-300 transition-all">
          Contact
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

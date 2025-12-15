import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-6 bg-slate-900 text-gray-300">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-1">
        <p className="text-gray-400 text-xs">
          © 2025 Vishal Singh. All rights reserved.
        </p>

        <p
          className="text-gray-400 text-sm italic"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Built with ❤️ by Vishal Singh
        </p>
      </div>
    </footer>
  );
};

export default Footer;

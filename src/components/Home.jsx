import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const isLoggedIn = !!localStorage.getItem("token"); // check if user is logged in

  return (
    <div className="flex items-center justify-center grow px-6 py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Card */}
      <div className="max-w-3xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-2xl animate-fade-in">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
          PASS-OP
        </h1>

        <p className="text-center text-gray-400 mb-10">
          Secure password management, without noise.
        </p>

        {/* Content */}
        <div className="space-y-6 text-lg text-gray-300 leading-relaxed text-center">
          <p>
            PASS-OP is designed for people who value{" "}
            <span className="text-white font-medium">clarity</span>,{" "}
            <span className="text-white font-medium">privacy</span>, and{" "}
            <span className="text-white font-medium">control</span>.
          </p>

          <p>
            Store, access, and manage your credentials in a focused environment
            where every action has intent — nothing more, nothing less.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
          {isLoggedIn ? (
            <Link
              to="/manager"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-all duration-300 hover:scale-105"
            >
              Open Vault
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-all duration-300 hover:scale-105"
            >
              Login to Open Vault
            </Link>
          )}

          <Link
            to="/about"
            className="px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
          >
            About PASS-OP
          </Link>
        </div>

        {/* Footer line */}
        <div className="mt-12 text-center text-sm text-gray-500 italic">
          Your data. Your rules. Zero distraction.
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Home;

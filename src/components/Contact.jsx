import React from "react";

const Contact = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white grow flex items-center justify-center px-6 py-20">
      {/* Card */}
      <div className="max-w-xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-2xl animate-fade-in">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
          Contact PASS-OP
        </h1>

        <p className="text-center text-gray-400 mb-10">
          Secure. Minimal. Always reachable.
        </p>

        {/* Info */}
        <div className="space-y-6 text-lg">
          <div className="flex items-center gap-4 group">
            <span className="text-emerald-400 text-xl group-hover:scale-110 transition">
              ✉
            </span>
            <p className="text-gray-300 group-hover:text-white transition">
              vishal0811singh@gmail.com
            </p>
          </div>

          <div className="flex items-center gap-4 group">
            <span className="text-emerald-400 text-xl group-hover:scale-110 transition">
              ☎
            </span>
            <p className="text-gray-300 group-hover:text-white transition">
              +91 63973 58371
            </p>
          </div>
        </div>

        {/* Footer Line */}
        <div className="mt-12 text-center text-sm text-gray-500">
          Built with focus. Designed for privacy.
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

export default Contact;

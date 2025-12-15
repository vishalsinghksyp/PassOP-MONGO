import React from "react";

const About = () => {
  return (
    <div className="flex items-center justify-center px-6 py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Card */}
      <div className="max-w-3xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-2xl animate-fade-in">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
          About PASS-OP
        </h1>

        <p className="text-center text-gray-400 mb-10">
          Minimal. Secure. Built with intent.
        </p>

        {/* Content */}
        <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
          <p>
            PASS-OP is a modern password manager focused on one core principle —
            <span className="text-white font-medium">
              {" "}
              your data belongs only to you
            </span>
            . Every credential you store is isolated, protected, and accessible
            only after authentication.
          </p>

          <p>
            Designed with a clean interface and a distraction-free experience,
            PASS-OP eliminates unnecessary complexity while maintaining strong
            security practices behind the scenes.
          </p>

          <p>
            This project reflects a balance between{" "}
            <span className="text-emerald-400 font-medium">privacy</span>,{" "}
            <span className="text-emerald-400 font-medium">performance</span>,
            and <span className="text-emerald-400 font-medium">clarity</span> —
            something that scales with trust, not noise.
          </p>
        </div>

        {/* Footer line */}
        <div className="mt-12 text-center text-sm text-gray-500">
          Crafted for people who value control and calm technology.
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

export default About;

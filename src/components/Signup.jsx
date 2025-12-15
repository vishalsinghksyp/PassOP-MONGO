import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        navigate("/Login"); // redirect to login page
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="grow justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col">
      {/* Header */}
      <div className="flex justify-center items-center gap-1 p-6">
        <h1 className="font-extrabold text-3xl text-white">Password</h1>
        <h1 className="font-extrabold text-3xl text-emerald-400">Manager</h1>
      </div>

      {/* Card */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 text-white">
          <h2 className="text-2xl font-semibold text-center">Create Account</h2>
          <p className="text-sm text-gray-300 text-center mt-1">
            Secure your passwords in one place
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSignup}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg
                           placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg
                           placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pr-10 bg-white/20 border border-white/30 rounded-lg
                           placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <img
                src={showPassword ? "./eye.png" : "./hidden.png"}
                alt="toggle password"
                className="w-5 h-5 absolute right-3 top-9 cursor-pointer opacity-80 hover:opacity-100"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-emerald-500 text-black py-2 rounded-lg 
             font-semibold hover:bg-emerald-400 transition
             flex items-center justify-center gap-2"
            >
              <span>Create Account</span>
              <lord-icon
                src="https://cdn.lordicon.com/urswgamh.json"
                trigger="hover"
                target="button"
                colors="primary:#ffffff,secondary:#ffffff"
                style={{ width: "24px", height: "24px" }}
              ></lord-icon>
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-gray-300 text-center mt-6">
            Already have an account?{" "}
            <Link
              to="/Login"
              className="text-emerald-400 font-medium cursor-pointer hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

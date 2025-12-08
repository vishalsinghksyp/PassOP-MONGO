import React, { useState, useEffect } from "react";
import ReactButton from "./ReactButton";
import { ToastContainer, toast } from "react-toastify";

const Manager = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [copyToast, setCopyToast] = useState("");
  const [editId, setEditId] = useState(null);
  const [buttonText, setButtonText] = useState("Save");

  const BASE_URL = "http://localhost:3000"; // your backend URL

  const savePassToast = () => toast("Password saved successfully!");

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyFunction = (text) => {
    navigator.clipboard.writeText(text);
    setCopyToast("Copied!");
    setTimeout(() => setCopyToast(""), 2000);
  };

  // Fetch all passwords from backend
  const fetchPasswords = async () => {
    try {
      const res = await fetch(`${BASE_URL}/`);
      const data = await res.json();
      setPasswordArray(data);
    } catch (err) {
      console.error("Error fetching passwords:", err);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  // Save or update password
  const savePassword = async () => {
    if (!form.site || !form.username || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        // Update password
        await fetch(`${BASE_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        savePassToast();
      } else {
        // Add new password
        await fetch(`${BASE_URL}/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        savePassToast();
      }
      setForm({ site: "", username: "", password: "" });
      setEditId(null);
      setButtonText("Save");
      fetchPasswords(); // refresh list
    } catch (err) {
      console.error("Error saving password:", err);
    }
  };

  const handleEdit = (item) => {
    setForm({
      site: item.site,
      username: item.username,
      password: item.password,
    });
    setEditId(item._id); // use MongoDB _id
    setButtonText("Update");
  };

  const deletePassword = async (id) => {
    const dec = confirm("Do you want to delete?");
    if (!dec) return;
    try {
      await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      fetchPasswords();
    } catch (err) {
      console.error("Error deleting password:", err);
    }
  };

  return (
    <>
      <ToastContainer />

      {/* Background & Heading remain the same */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-200 opacity-20 blur-[100px]"></div>
      </div>

      <div className="flex flex-row justify-center items-center gap-1 p-4">
        <h1 className="font-extrabold text-3xl text-black text-outline">
          Password
        </h1>
        <h1 className="font-extrabold text-3xl text-emerald-600 text-outline">
          Manager
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="text-emerald-950 grid grid-cols-1 md:grid-cols-3 gap-3 p-4"
      >
        <input
          type="text"
          value={form.site}
          onChange={(e) => setForm({ ...form, site: e.target.value })}
          placeholder="https://example.com/"
          autoComplete="website"
          className="border-green-500 p-2 rounded-full bg-slate-100 border w-full
          focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-400"
        />
        <input
          type="text"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          placeholder="Username or XYZ@gmail.com"
          autoComplete="username"
          className="border-green-500 p-2 rounded-full bg-slate-100 border w-full
          focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-400"
        />
        <div className="relative w-full">
          <input
            type={show ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            autoComplete="current-password"
            className="border-green-500 p-2 rounded-full bg-slate-100 border w-full
            focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-400 pr-10"
          />
          <img
            src={show ? "./eye.png" : "./hidden.png"}
            alt="toggle"
            className="w-6 h-6 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setShow(!show)}
          />
        </div>
      </form>

      {/* Save/Update Button */}
      <div className="flex flex-row gap-2 p-4 justify-center">
        <ReactButton
          onClick={savePassword}
          icon={
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
              target="button"
            ></lord-icon>
          }
          text={buttonText}
        />
      </div>

      {/* Password Table */}
      {passwordArray.length > 0 && (
        <div className="p-4">
          <h2 className="font-bold text-xl mb-2 italic">-Saved Passwords-</h2>
          <div className="overflow-x-auto w-full">
            <table className="w-full table-auto border border-black rounded">
              <thead>
                <tr className="bg-green-800 text-white">
                  <th className="border px-2 py-1">Website</th>
                  <th className="border px-2 py-1">Username</th>
                  <th className="border px-2 py-1">Password</th>
                  <th className="border px-2 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item) => (
                  <tr
                    key={item._id}
                    className="text-center bg-green-100 text-black"
                  >
                    <td className="border border-white px-2 py-1 relative pr-10">
                      <span>{item.site}</span>
                      <span
                        className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer lordIcon"
                        onClick={() => copyFunction(item.site)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="click"
                          title="copy"
                          style={{ width: "20px", height: "20px" }}
                        ></lord-icon>
                      </span>
                    </td>
                    <td className="border border-white px-2 py-1 relative pr-10">
                      <span>{item.username}</span>
                      <span
                        className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer lordIcon"
                        onClick={() => copyFunction(item.username)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="click"
                          title="copy"
                          style={{ width: "20px", height: "20px" }}
                        ></lord-icon>
                      </span>
                    </td>
                    <td className="border border-white px-2 py-1 relative pr-16">
                      <span className="font-mono">
                        {visiblePasswords[item._id]
                          ? item.password
                          : "•".repeat(8)}
                      </span>
                      <img
                        src={
                          visiblePasswords[item._id]
                            ? "./eye.png"
                            : "./hidden.png"
                        }
                        alt="toggle"
                        className="w-5 h-5 absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => togglePasswordVisibility(item._id)}
                      />
                      <span
                        className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer lordIcon"
                        onClick={() => copyFunction(item.password)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="click"
                          title="copy"
                          style={{ width: "20px", height: "20px" }}
                        ></lord-icon>
                      </span>
                    </td>
                    <td className="border border-white px-2 py-1 ">
                      <div className="flex justify-center">
                        <button
                          className="flex cursor-pointer items-center gap-2 hover:bg-yellow-300
                          text-black px-3 py-1.5 rounded-lg transition-all shadow-sm hover:shadow 
                          backdrop-blur-md active:scale-95 hover:text-white"
                          onClick={() => handleEdit(item)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            title="Edit"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </button>

                        <button
                          className="flex cursor-pointer items-center gap-2 hover:bg-red-400 
                          text-black px-3 py-1.5 rounded-lg transition-all shadow-sm hover:shadow 
                          backdrop-blur-md active:scale-95 hover:text-white"
                          onClick={() => deletePassword(item._id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/xyfswyxf.json"
                            trigger="hover"
                            title="delete"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Copy Toast */}
      {copyToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg shadow-lg animate-fade">
          {copyToast}
        </div>
      )}
    </>
  );
};

export default Manager;

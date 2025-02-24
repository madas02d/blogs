import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import registImage from "../assets/hero-register.jpg";
const RegisterPage = () => {
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_Password, setRe_Password] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== re_Password) {
      setError("Passwords do not match. Please re-enter");
      return;
    }
    try {
      await signup(fullName, email, password);
      navigate("/login");
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen flex-col md:flex-row flex items-center justify-center gap-20 bg-gray-100 p-4">
      <div className="p-8">
        <img
          src={registImage}
          alt="Hero"
          className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl h-auto"
        />
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={fullName}
              type="text"
              id="fullName"
              name="fullName"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="rePassword"
              className="block text-sm font-medium text-gray-700"
            >
              Re-enter Password
            </label>
            <input
              onChange={(e) => setRe_Password(e.target.value)}
              value={re_Password}
              type="password"
              id="rePassword"
              name="rePassword"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            CONTINUE
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          When you create an account !
        </p>
      </div>
    </div>
  );
};
export default RegisterPage;

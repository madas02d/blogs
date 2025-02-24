import React, { useState, useContext, use } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import HeroLogin from "../assets/hero-login.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Access "login" from AuthContext
  const { login } = useContext(AuthContext);

  // Use navigate from the react-router
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      // If login is successfull, redirect
      navigate("/dashboard");
    } catch (error) {
      // If login fails, handle the error
      setError("Login failed. Please check your credentials and try again!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex-col md:flex-row flex items-center justify-center gap-20 bg-gray-100 p-4">
      <div className="p-8">
        <img
          src={HeroLogin}
          className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl h-auto"
        />
      </div>
      <div className="flex flex-col bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form className="flex flex-col gap-2 mb-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <h2 className="text-center">Login</h2>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Enter your e-mail..."
            className="p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Enter your password..."
            className="p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium cursor-pointer rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Continue
          </button>
          <p>
            You don't have an acount? Please register{" "}
            <Link to="/signup" className="text-blue-500">
              here
            </Link>
          </p>
        </form>
        <div>
          <div class="px-6 sm:px-0 max-w-sm">
            <button
              type="button"
              class="text-white w-full  bg-[#a7adb6] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
            >
              <svg
                class="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign in with Google<div></div>
            </button>
          </div>
          <div class="px-6 sm:px-0 max-w-sm">
            <button
              type="button"
              class="text-white w-full bg-black hover:bg-black/90 focus:ring-4 focus:outline-none cursor-pointer  focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
            >
              <svg
                class="mr-2 -ml-1 w-5 h-5"
                aria-hidden="true"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="white"
                  d="M318.7 268.6c-.5-42.2 18.5-73.6 57.1-96-21-30.7-53.3-47.5-96-50.5-40.7-3-85 23.6-102 23.6-17.4 0-55.1-22.8-85-22.2C46.5 124 0 171.8 0 242.8c0 34.4 6.6 69 19.6 104.6 17.6 47.9 62 161.3 111.7 160.6 26.7-.3 45.6-18.4 67.8-18.4 21.8 0 38.2 18.4 64.4 17.9 50.4-.8 90-91.6 107.3-139.9-28-13.2-51.3-36.2-52.1-98.9zM268.7 84.8C293 57 308.3 22 304 0c-28.3 2.4-61 19.7-79.9 41.6-17.2 19.7-32.2 51.7-28.2 82.1 30.1 2.3 61.2-13.7 85.8-38.9z"
                />
              </svg>
              Sign in with Apple<div></div>
            </button>
          </div>

          <div class="px-6 sm:px-0 max-w-sm">
            <button
              type="button"
              class="text-white w-full bg-[#1877F2] hover:bg-[#1877F2]/90 focus:ring-4 focus:outline-none focus:ring-[#1877F2]/50 font-medium cursor-pointer rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
            >
              <svg
                class="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="facebook-f"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M279.14 288l14.22-92.66h-88.91V132.1c0-25.35 12.42-50.06 52.24-50.06H293V6.26S267.53 0 243.71 0c-73.17 0-121.21 44.38-121.21 124.72V195.3H64v92.66h58.5V480h107.4V288z"
                ></path>
              </svg>
              Sign in with Facebook<div></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

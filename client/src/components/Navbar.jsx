import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = user;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const renderAuthButtons = () => {
    if (user) {
      return (
        <>
          <Link
            to="/write"
            className="px-3 py-2 rounded-md text-sm hover:bg-gray-700"
          >
            Write
          </Link>
          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-md text-sm hover:bg-gray-700"
          >
            Logout
          </button>
          <Link to="/profile" className="flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src={user.profilePicture || "https://banner2.cleanpng.com/20180603/jx/avomq8xby.webp"}
              alt="Profile"
            />
          </Link>
        </>
      );
    }
    return (
      <>
        <Link
          to="/login"
          className="px-3 py-2 rounded-md text-sm hover:bg-gray-700"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-3 py-2 rounded-md text-sm bg-blue-600 hover:bg-blue-700"
        >
          Register
        </Link>
      </>
    );
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Left side */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold">
                WEBBLOG
              </Link>
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-sm hover:bg-gray-700"
                >
                  Home
                </Link>
                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-md text-sm hover:bg-gray-700"
                >
                  Dashboard
                </Link>
              
              </div>
            </div>
          </div>

          {/* Right side - Auth buttons */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {renderAuthButtons()}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base hover:bg-gray-700"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base hover:bg-gray-700"
            >
              Dashboard
            </Link>
            <Link
              to="/posts"
              className="block px-3 py-2 rounded-md text-base hover:bg-gray-700"
            >
              Posts
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/write"
                  className="block px-3 py-2 rounded-md text-base hover:bg-gray-700"
                >
                  Write
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base hover:bg-gray-700"
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base hover:bg-gray-700"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base hover:bg-gray-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

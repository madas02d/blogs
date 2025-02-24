import React, { createContext, useState, useEffect } from "react";
// Create a context for authentication state
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State for storing user data
  const [user, setUser] = useState(null);
  // Loading state for initial auth check
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if (user) {
    checkAuth();
    // }
  }, []);
  // Check authentication status when component mounts
  const checkAuth = async () => {
    try {
      // Make request to validate endpoint
      // credentials: 'include' ensures cookies are sent with request

      const response = await fetch(`http://localhost:8000/users/`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        // If token is valid, set user data
        const userData = await response.json();
        setUser(userData);
      } else {
        // If token is invalid, clear user data
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      // Mark loading as complete regardless of outcome
      setLoading(false);
    }
  };
  // Handle user login
  const login = async (email, password) => {
    try {
      // Send login request with credentials
      const response = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Needed to receive and store cookies
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      // On successful login, set user data
      await checkAuth();
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (fullName, email, password) => {
    try {
      // Send login request with credentials
      const response = await fetch("http://localhost:8000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Needed to receive and store cookies
        body: JSON.stringify({ fullName, email, password }),
      });

      if (!response.ok) {
        throw new Error("Register failed");
      }
      // On successful login, set user data
      await checkAuth();
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  // Handle user logout
  const logout = async () => {
    try {
      // Send logout request to clear server-side session

      const response = await fetch("http://localhost:8000/users/logout", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        console.error("logout failed");
      }
      // Clear user data from state
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Provide auth context to child components
  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        loading,
        // isAuthenticated: !!user // Helper boolean for checking auth status
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

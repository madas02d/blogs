import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import PostPage from "./pages/PostPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WritePost from "./pages/WritePost";
import UserProfile from "./pages/UserProfile";
import { AuthProvider } from "./context/AuthContext";
import { PostsProvider } from "./context/PostsContext";

function App() {
  return (
    <AuthProvider>
      <PostsProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/posts/:postId" element={<PostPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/write" element={<WritePost />} />
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </PostsProvider>
    </AuthProvider>
  );
}

export default App;

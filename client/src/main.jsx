import React from 'react'; // Add this line
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CommentProvider } from "./context/CommentContext.jsx";

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthProvider>
      <CommentProvider>
        <App />
      </CommentProvider>
    </AuthProvider>
  </BrowserRouter>

)

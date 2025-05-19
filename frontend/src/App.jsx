import React, { useEffect } from 'react';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthstore.js";
import { useThemeStore } from "./store/useThemeStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { isDarkMode } = useThemeStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Apply theme whenever it changes
  useEffect(() => {
    // Set theme based on isDarkMode
    const theme = isDarkMode ? "dark" : "light";
    
    // Set theme directly on multiple elements for maximum compatibility
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    
    // If you have a root element with id="root", also set it there
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.setAttribute("data-theme", theme);
    }
    
    // Apply theme to any frames if they exist
    const frames = document.querySelectorAll('iframe');
    frames.forEach(frame => {
      try {
        if (frame.contentDocument) {
          frame.contentDocument.documentElement.setAttribute("data-theme", theme);
        }
      } catch (e) {
        // Ignore cross-origin frame errors
      }
    });
  }, [isDarkMode]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
    
  return (
    <div className="app-container min-h-screen theme-transition">
      <Navbar />
      
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster position="top-center" />
    </div>
  );
};

export default App;
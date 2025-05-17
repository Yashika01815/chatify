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
import ThemeDebug from "./components/ThemeDebug";

// Import theme CSS (only needed if the index.css approach doesn't work)
// import './themeStyles.css';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Apply theme whenever it changes
  useEffect(() => {
    // Set theme directly on multiple elements for maximum compatibility
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    
    // If you have a root element with id="root", also set it there
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.setAttribute("data-theme", theme);
    }
    
    console.log("Theme applied:", theme);
    
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
    
    // Force a reflow to make sure browsers apply the theme
    document.body.style.display = 'none';
    // This will force a reflow
    void document.body.offsetHeight;
    document.body.style.display = '';
    
  }, [theme]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen" data-theme={theme}>
        <Loader className="size-10 animate-spin" />
      </div>
    );
    
  return (
    <div className="app-container min-h-screen theme-transition" data-theme={theme}>
      <Navbar />
      
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster position="top-center" />
      
      {/* Theme Debug Component - Remove in production */}
      <ThemeDebug />
    </div>
  );
};

export default App;
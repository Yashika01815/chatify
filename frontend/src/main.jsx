import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// Initialize the theme from localStorage or use default
const savedTheme = localStorage.getItem("chat-theme-storage")
  ? JSON.parse(localStorage.getItem("chat-theme-storage"))?.state?.theme
  : "coffee";

// Set the theme on the HTML element immediately before rendering
document.documentElement.setAttribute("data-theme", savedTheme);
console.log("Initial theme set from localStorage:", savedTheme);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
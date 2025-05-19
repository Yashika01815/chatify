import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define a function to handle theme initialization properly
const getInitialTheme = () => {
  // Try to get theme from localStorage directly first
  const storedThemeData = localStorage.getItem("chat-theme-storage");
  if (storedThemeData) {
    try {
      const parsedData = JSON.parse(storedThemeData);
      if (parsedData.state && parsedData.state.isDarkMode !== undefined) {
        return parsedData.state.isDarkMode;
      }
    } catch (e) {
      console.error("Error parsing theme from localStorage:", e);
    }
  }
  
  // Detect user's preferred color scheme as fallback
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDarkMode;
};

export const useThemeStore = create(
  persist(
    (set, get) => ({
      isDarkMode: getInitialTheme(),
      toggleTheme: () => {
        const newIsDarkMode = !get().isDarkMode;
        set({ isDarkMode: newIsDarkMode });
        
        // Apply theme directly
        const theme = newIsDarkMode ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", theme);
      },
    }),
    {
      name: "chat-theme-storage",
      getStorage: () => localStorage,
    }
  )
);
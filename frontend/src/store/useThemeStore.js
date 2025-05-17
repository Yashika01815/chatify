import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define a function to handle theme initialization properly
const getInitialTheme = () => {
  // Try to get theme from localStorage directly first
  const storedThemeData = localStorage.getItem("chat-theme-storage");
  if (storedThemeData) {
    try {
      const parsedData = JSON.parse(storedThemeData);
      if (parsedData.state && parsedData.state.theme) {
        return parsedData.state.theme;
      }
    } catch (e) {
      console.error("Error parsing theme from localStorage:", e);
    }
  }
  
  // Fallback to direct localStorage item if the persist format isn't found
  const directTheme = localStorage.getItem("chat-theme");
  if (directTheme) {
    return directTheme;
  }
  
  // Default theme if nothing is found
  return "coffee";
};

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: getInitialTheme(),
      setTheme: (theme) => {
        set({ theme });
        // Also directly set localStorage as a backup
        localStorage.setItem("chat-theme", theme);
        // Force theme application
        document.documentElement.setAttribute("data-theme", theme);
        console.log("Theme set in store:", theme);
      },
    }),
    {
      name: "chat-theme-storage",
      getStorage: () => localStorage,
    }
  )
);
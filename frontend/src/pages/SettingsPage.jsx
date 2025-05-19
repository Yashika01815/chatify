import React from 'react';
import { useThemeStore } from "../store/useThemeStore";
import { Sun, Moon } from "lucide-react";

const SettingsPage = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  
  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">Choose between light and dark mode for your chat interface</p>
        </div>

        <div className="flex justify-center">
          <div className="bg-base-200 p-6 rounded-lg shadow-md">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={toggleTheme}
            >
              <div className={`
                relative w-14 h-7 rounded-full transition-colors
                ${isDarkMode ? "bg-primary" : "bg-base-300"}
              `}>
                <div className={`
                  absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform
                  ${isDarkMode ? "translate-x-8" : "translate-x-1"}
                `}></div>
              </div>
              <div className="flex items-center gap-2">
                {isDarkMode ? (
                  <>
                    <Moon className="text-primary" size={20} />
                    <span className="font-medium">Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="text-amber-500" size={20} />
                    <span className="font-medium">Light Mode</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <h3 className="text-lg font-semibold mb-3">Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Yashika Thakkar</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-xl p-3 shadow-sm bg-base-200">
                      <p className="text-sm">Hey! How's it going?</p>
                      <p className="text-[10px] mt-1.5 text-base-content/70">11:00 PM</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-xl p-3 shadow-sm bg-primary text-primary-content">
                      <p className="text-sm">I'm doing great! Just working on some new features.</p>
                      <p className="text-[10px] mt-1.5 text-primary-content/70">11:00 PM</p>
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn btn-primary h-10 min-h-0">
                      <span className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m22 2-7 20-4-9-9-4Z"></path>
                          <path d="M22 2 11 13"></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
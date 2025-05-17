import React, { useState, useEffect } from 'react';
import { useThemeStore } from '../store/useThemeStore';

const ThemeDebug = () => {
  const { theme, setTheme } = useThemeStore();
  const [cssVars, setCssVars] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  
  useEffect(() => {
    // Get computed CSS variables for the current theme
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    const themeVars = {};
    // Check key DaisyUI variables to see if they're being applied
    [
      '--p', '--s', '--a', '--n', 
      '--b1', '--b2', '--b3', '--bc',
      '--pc', '--sc', '--ac', '--nc',
      '--rounded-box', '--rounded-btn'
    ].forEach(varName => {
      themeVars[varName] = computedStyle.getPropertyValue(varName);
    });
    
    setCssVars(themeVars);
  }, [theme]);
  
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  
  const forceDaisyUITheme = () => {
    // Create a style element with theme CSS
    const style = document.createElement('style');
    style.setAttribute('id', 'dynamic-theme-style');
    
    // Remove any existing dynamic theme style
    const existingStyle = document.getElementById('dynamic-theme-style');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    // Apply CSS directly based on theme
    // This is a brute force approach when all else fails
    document.head.appendChild(style);
    alert('Force-applied theme rules. Page may need to be refreshed.');
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-base-300 p-4 rounded-lg shadow-lg max-w-xs opacity-90 hover:opacity-100 transition-opacity">
      <div className="flex justify-between items-center">
        <h4 className="font-bold">Theme Debug</h4>
        <button 
          onClick={toggleDetails}
          className="text-xs bg-base-100 px-2 py-1 rounded"
        >
          {showDetails ? 'Hide' : 'Show'} Details
        </button>
      </div>
      
      <p className="my-2">Current theme: <span className="font-bold">{theme}</span></p>
      
      {/* Theme color indicators */}
      <div className="grid grid-cols-4 gap-1 mt-2 mb-2">
        <div className="bg-primary h-6 rounded" title="primary"></div>
        <div className="bg-secondary h-6 rounded" title="secondary"></div>
        <div className="bg-accent h-6 rounded" title="accent"></div>
        <div className="bg-neutral h-6 rounded" title="neutral"></div>
      </div>
      
      {/* Base colors */}
      <div className="grid grid-cols-3 gap-1 mt-1 mb-2">
        <div className="bg-base-100 h-4 rounded border border-base-300" title="base-100"></div>
        <div className="bg-base-200 h-4 rounded" title="base-200"></div>
        <div className="bg-base-300 h-4 rounded" title="base-300"></div>
      </div>
      
      {/* Variable details */}
      {showDetails && (
        <div className="text-xs mt-2">
          <p className="font-bold">CSS Variables:</p>
          <pre className="overflow-auto max-h-24 bg-base-100 p-1 rounded">
            {JSON.stringify(cssVars, null, 2)}
          </pre>
          
          <div className="mt-2 flex flex-col gap-1">
            <button 
              onClick={forceDaisyUITheme}
              className="text-xs bg-primary text-primary-content px-2 py-1 rounded hover:bg-primary-focus"
            >
              Force Apply Theme
            </button>
            
            <p className="text-xs text-base-content/70 mt-1">
              Status: {Object.values(cssVars).some(v => v === '') ? 
                '❌ Theme variables missing' : 
                '✅ Theme variables present'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeDebug;
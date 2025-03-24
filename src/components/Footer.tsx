import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`py-4 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-100 text-gray-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center">
          &copy; {new Date().getFullYear()} Pharm.AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
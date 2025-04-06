import React from "react";
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();

  const textColor = theme === 'light' ? 'text-gray-700' : 'text-white';
  const hoverTextColor = theme === 'light' ? 'hover:text-gray-600' : 'hover:text-white';
  const linkColor = theme === 'light' ? 'text-purple-700' : 'text-purple-500';
  const linkHoverColor = theme === 'light' ? 'hover:text-black' : 'hover:text-white';
  const socialIconColor = theme === 'light' ? 'text-gray-600' : 'text-purple-200';
  const socialIconHoverColor = theme === 'light' ? 'hover:text-purple-600' : 'hover:text-purple-600';
  return (
    <footer className={`w-full bg-black/20 backdrop-blur-lg border border-white/10 ${textColor} py-4 rounded-t-lg`}>
      <div className="max-w-full px-4 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm">
        {/* Left Section: Company Info */}
        <div className="text-center md:text-left mb-2 md:mb-0">
          <h2 className={`text-sm md:text-base font-semibold ${linkColor}`}>
            Pharm.AI
          </h2>
          <p className={`text-xs ${textColor}`}>
            Accelerating drug discovery with AI.
          </p>
          <p className={`text-xs ${textColor}`}>Kottayam, Kerela</p>
          <p className={`text-xs ${textColor}`}>Phone: 0000000000</p>
          <a
            href="mailto:info@pharma.ai"
            className={`${textColor} ${hoverTextColor}`}
          >
            info@pharma.ai
          </a>
          <p className={textColor}>© 2025 Pharm.AI All rights reserved.</p>
        </div>

        {/* Middle Section: Links - Moved Slightly Left */}
        <div className="flex space-x-5 mt-2 md:mt-0 md:ml-[-60px]">
          <a href="/about" className={`${linkColor} ${linkHoverColor}`}>
            About
          </a>
          <a href="/contact" className={`${linkColor} ${linkHoverColor}`}>
            Contact
          </a>
          <a href="/privacy" className={`${linkColor} ${linkHoverColor}`}>
            Privacy
          </a>
        </div>

        {/* Right Section: Social Links */}
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a
            href="https://twitter.com"
            className={`${socialIconColor} ${socialIconHoverColor}`}
          >
            <FaTwitter size={25} />
          </a>
          <a
            href="https://linkedin.com"
            className={`${socialIconColor} ${socialIconHoverColor}`}
          >
            <FaLinkedin size={25} />
          </a>
          <a
            href="https://facebook.com"
            className={`${socialIconColor} ${socialIconHoverColor}`}
          >
            <FaFacebook size={25} />
          </a>
          <a
            href="https://instagram.com"
            className={`${socialIconColor} ${socialIconHoverColor}`}
          >
            <FaInstagram size={25} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start mb-4 md:mb-0">
            <p className="text-center text-sm">
              &copy; {new Date().getFullYear()} 个人简历. 保留所有权利.
            </p>
          </div>
          <div class="flex justify-center space-x-6 md:justify-end">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="text-gray-300 hover:text-white transition-colors duration-300">
              <span class="sr-only">GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="text-gray-300 hover:text-white transition-colors duration-300">
              <span class="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
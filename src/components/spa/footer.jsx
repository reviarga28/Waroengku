"use client";
import React from 'react';

export const SpaFooter = () => {
  return (
    <footer className="pt-6 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Waroengku. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-red-400 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-red-400 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-red-400 text-sm transition-colors">Sitemap</a>
            </div>
          </div>
      </div>
    </footer>
  );
};
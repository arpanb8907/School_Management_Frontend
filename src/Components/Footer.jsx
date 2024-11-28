import React from 'react';

const Footer = () => (
  <footer className="bg-gray-800 text-white py-4">
    <div className="container mx-auto text-center">
      <p className="text-sm">© 2024 School Management System. All rights reserved.</p>
      <div className="mt-2">
        <a href="/" className="text-blue-400 hover:underline mx-2">Home</a>
        <a href="/contact" className="text-blue-400 hover:underline mx-2">Contact</a>
        <a href="/privacy" className="text-blue-400 hover:underline mx-2">Privacy Policy</a>
      </div>
    </div>
  </footer>
);

export default Footer;

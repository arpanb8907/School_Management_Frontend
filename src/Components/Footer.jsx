import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gray-900 text-white py-6">
    <div className="container mx-auto text-center">
      <p className="text-sm">© 2024 School Management System. All rights reserved.</p>
      
      <div className="mt-3 flex justify-center space-x-4">
        <a href="/" className="text-blue-400 hover:underline">Home</a>
        <a href="/contact" className="text-blue-400 hover:underline">Contact</a>
        <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>
      </div>

      {/* Social Media Icons */}
      <div className="mt-4 flex justify-center space-x-6 text-xl">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-500 transition">
          <FaInstagram />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 transition">
          <FaTwitter />
        </a>
        <a href="https://www.linkedin.com/in/arpan-bhowmick-383a611b5/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition">
          <FaLinkedin />
        </a>
        <a href="https://github.com/arpanb8907" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-400 transition">
          <FaGithub />
        </a>
      </div>

      {/* Made with ❤️ */}
      <p className="mt-4 text-sm text-gray-400">
        Made with <span className="text-red-500">❤️</span> by debug_19
      </p>
    </div>
  </footer>
);

export default Footer;

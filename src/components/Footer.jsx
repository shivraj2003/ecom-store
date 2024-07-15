import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">About Us</h3>
          <p className="text-gray-400">
            We are a leading e-commerce store providing top-quality products
            with excellent customer service. Our mission is to offer the best
            online shopping experience.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Customer Service</h3>
          <ul className="text-gray-400">
            <li>
              <a href="/help" className="hover:underline">Help & FAQs</a>
            </li>
            <li>
              <a href="/shipping" className="hover:underline">Shipping & Returns</a>
            </li>
            <li>
              <a href="/privacy" className="hover:underline">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms" className="hover:underline">Terms & Conditions</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Stay Connected</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com" className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <div className="mt-4">
            <h3 className="font-bold text-lg mb-2">Subscribe to our Newsletter</h3>
            <form>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-md text-gray-700"
              />
              <button
                type="submit"
                className="mt-2 w-full bg-red-500 hover:bg-red-400 text-white py-2 rounded-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-gray-400">
        <p>&copy; 2024 Ecom Store. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

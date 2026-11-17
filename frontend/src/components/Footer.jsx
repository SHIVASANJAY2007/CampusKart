import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
          
          {/* Brand and Slogan */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-[#007BFF] text-3xl font-extrabold tracking-tight mb-2">
              Campus<span className="text-[#2B303B]">KART</span>
            </h1>
            <p className="text-gray-500 max-w-xs">
              Your one-stop marketplace for everything on campus.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="text-lg font-bold text-[#2B303B] mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#007BFF] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#007BFF] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[#007BFF] transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#2B303B] mb-4">Marketplace</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#007BFF] transition-colors">Buying</a></li>
                <li><a href="#" className="hover:text-[#007BFF] transition-colors">Selling</a></li>
                <li><a href="#" className="hover:text-[#007BFF] transition-colors">Community</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-lg font-bold text-[#2B303B] mb-4">Policies</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#007BFF] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#007BFF] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#007BFF] transition-colors">Refunds</a></li>
              </ul>
            </div>
          </div>
          
          {/* Social Media */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h4 className="text-lg font-bold text-[#2B303B] mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#007BFF] transition-colors transform hover:scale-110">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-[#007BFF] transition-colors transform hover:scale-110">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-[#007BFF] transition-colors transform hover:scale-110">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-[#007BFF] transition-colors transform hover:scale-110">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            &copy; 2025 CampusKART. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
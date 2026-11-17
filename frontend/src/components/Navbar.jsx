import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Upload, Users, User, Home as HomeIcon, LogOut } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userData');
    navigate('/');
  };

  const navItems = [
    { name: 'Home', path: '/home', icon: <HomeIcon size={20} /> },
    { name: 'Buying', path: '/buying', icon: <ShoppingBag size={20} /> },
    { name: 'Selling', path: '/selling', icon: <Upload size={20} /> },
    { name: 'Community', path: '/community', icon: <Users size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200' : 'bg-white border-b border-gray-200'}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-[#007BFF] text-3xl font-extrabold tracking-tight transform hover:scale-105 transition-transform duration-300">
          Campus<span className="text-[#2B303B]">KART</span>
        </Link>
        
        <div className="flex items-center space-x-6 lg:space-x-8">
          {/* Navigation Items */}
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center group relative text-gray-600 hover:text-[#007BFF] transition-colors duration-300 ${
                location.pathname === item.path ? 'text-[#007BFF]' : ''
              }`}
            >
              <div className="transform group-hover:-translate-y-1 transition-transform duration-300">
                {item.icon}
              </div>
              <span className="text-xs lg:text-sm mt-1 font-medium">{item.name}</span>
            </Link>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center group relative text-gray-400 hover:text-red-400 transition-colors duration-300"
            title="Logout"
          >
            <div className="transform group-hover:-translate-y-1 transition-transform duration-300">
              <LogOut size={20} />
            </div>
            <span className="text-xs lg:text-sm mt-1 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
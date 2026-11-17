import React from 'react';
import { ShoppingBag, Upload, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import InteractiveSpinner from '../components/InteractiveSpinner';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#2B303B] p-8">
      
      {/* Hero Section */}
      <div className="text-center py-24 px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#2B303B] mb-6 leading-tight tracking-wide">
          Your Campus <span className="text-[#007BFF]">Marketplace</span>.
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 font-light">
          Buy and sell used books, electronics, and essentials with fellow students.
          Connect, collaborate, and thrive together.
        </p>
        <div className="flex justify-center space-x-4 md:space-x-6">
            <Link 
            to="/buying" 
            className="bg-[#007BFF] text-white py-3 px-8 rounded-full font-bold text-lg shadow-lg hover:bg-[#0056b3] transition-colors duration-300 transform hover:scale-105"
          >
            Start Buying
          </Link>
            <Link 
            to="/selling" 
            className="bg-white text-[#007BFF] py-3 px-8 rounded-full font-bold text-lg border-2 border-[#007BFF] hover:bg-[#E4F1FF] transition-colors duration-300 transform hover:scale-105"
          >

            Start Selling
          </Link>
          
        </div>
      </div>
      
        <div className="mt-8">
          <InteractiveSpinner />
        </div>
        
      
      {/* Key Features Section */}
      <div className="py-16">
        <h2 className="text-4xl font-bold text-center text-[#2B303B] mb-12">How it Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          
          {/* Buying Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm transform hover:scale-105 transition-transform duration-300">
            <div className="flex justify-center mb-6">
              <div className="bg-[#007BFF] p-4 rounded-full text-white">
                <ShoppingBag size={48} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#2B303B] mb-4">Discover & Buy</h3>
            <p className="text-gray-600 leading-relaxed">
              Find pre-loved items from students on your campus. Browse by category, search for what you need, and connect with sellers instantly.
            </p>
          </div>
          
          {/* Selling Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm transform hover:scale-105 transition-transform duration-300">
            <div className="flex justify-center mb-6">
              <div className="bg-[#007BFF] p-4 rounded-full text-white">
                <Upload size={48} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#2B303B] mb-4">List & Sell</h3>
            <p className="text-gray-600 leading-relaxed">
              Have an item you no longer need? List it in minutes with our easy-to-use form, add photos, and set your price.
            </p>
          </div>
          
          {/* Community Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm transform hover:scale-105 transition-transform duration-300">
            <div className="flex justify-center mb-6">
              <div className="bg-[#007BFF] p-4 rounded-full text-white">
                <Users size={48} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#2B303B] mb-4">Join the Community</h3>
            <p className="text-gray-600 leading-relaxed">
              Connect with your peers on the community board. Post requests for items, share tips, and build a stronger campus network.
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
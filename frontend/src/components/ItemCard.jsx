import React from 'react';
import { ShoppingBag, Star, Mail } from 'lucide-react';

export default function ItemCard({ name, price, description, imageUrl, sellerEmail }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transform hover:scale-105 hover:shadow-md hover:border-[#007BFF] transition-all duration-300 ease-in-out cursor-pointer">
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover rounded-t-2xl transform hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#007BFF] py-1 px-3 rounded-full font-bold border border-gray-200">
          {price}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#2B303B] mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        {/* Seller Contact Info */}
        <div className="flex items-center text-gray-500 mb-4">
          <Mail size={16} className="mr-2" />
          <a 
            href={`mailto:${sellerEmail}`} 
            className="text-sm text-[#007BFF] hover:underline transition-colors duration-300"
          >
            {sellerEmail}
          </a>
        </div>
        
        {/* Rating and Action */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center text-[#007BFF]">
            <Star size={16} fill="currentColor" className="mr-1" />
            <Star size={16} fill="currentColor" className="mr-1" />
            <Star size={16} fill="currentColor" className="mr-1" />
            <Star size={16} fill="currentColor" className="mr-1" />
            <Star size={16} className="text-gray-300" />
          </div>
          <button className="flex items-center text-white bg-[#007BFF] py-2 px-4 rounded-full font-bold text-sm hover:bg-[#0056b3] transition-colors duration-300">
            <ShoppingBag size={16} className="mr-2" /> Buy
          </button>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import UserProfile from '../components/UserProfile';
import ItemCard from '../components/ItemCard';
import { ShoppingBag, Star, LayoutDashboard } from 'lucide-react';

export default function Profile() {
  // Placeholder data for user's listings and purchases
  const myItems = [
    { id: 1, name: 'Advanced Python Programming', price: '₹350', description: 'Excellent condition, textbook for CSE-201.', imageUrl: 'https://images.unsplash.com/photo-1544947953-333e387c1264?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 2, name: 'Casio Scientific Calculator', price: '₹600', description: 'FX-991ES Plus, perfect for engineering students.', imageUrl: 'https://images.unsplash.com/photo-1614713714571-000b0f796a7d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  const myPurchases = [
    { id: 3, name: 'HP Spectre Laptop', price: '₹45,000', description: '2 years old, great for coding and design.', imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b7a3a968?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <UserProfile />

      <div className="max-w-4xl mx-auto mt-12">
        {/* User Dashboard Section */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 mb-12">
          <div className="flex items-center text-[#007BFF] mb-6">
            <LayoutDashboard size={28} className="mr-3" />
            <h2 className="text-3xl font-bold text-[#2B303B]">My Dashboard</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:border-[#007BFF] transition-colors">
              <h3 className="text-xl font-bold mb-2 text-[#2B303B]">Items for Sale</h3>
              <p className="text-4xl font-extrabold text-[#007BFF]">{myItems.length}</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:border-[#007BFF] transition-colors">
              <h3 className="text-xl font-bold mb-2 text-[#2B303B]">Purchases Made</h3>
              <p className="text-4xl font-extrabold text-[#007BFF]">{myPurchases.length}</p>
            </div>
          </div>
        </div>
        
        {/* My Listings Section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <ShoppingBag size={28} className="text-[#007BFF] mr-3" />
            <h2 className="text-3xl font-bold text-[#2B303B]">My Listings</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myItems.length > 0 ? (
              myItems.map(item => (
                <ItemCard key={item.id} {...item} />
              ))
            ) : (
              <p className="text-gray-600 italic">You have no active listings.</p>
            )}
          </div>
        </div>
        
        {/* Purchase History Section */}
        <div>
          <div className="flex items-center mb-6">
            <Star size={28} className="text-[#007BFF] mr-3" />
            <h2 className="text-3xl font-bold text-[#2B303B]">Purchase History</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myPurchases.length > 0 ? (
              myPurchases.map(item => (
                <ItemCard key={item.id} {...item} />
              ))
            ) : (
              <p className="text-gray-600 italic">Your purchase history is empty.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
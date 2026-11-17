import React from 'react';
import SellingForm from '../components/SellingForm';

export default function Selling() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[#2B303B] tracking-wide leading-tight mb-4">
            List Your Item
          </h1>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Ready to sell? Fill out the details below to list your item for thousands of students to see.
          </p>
        </div>
        <SellingForm />
      </div>
    </div>
  );
}
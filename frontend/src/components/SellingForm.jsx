import React, { useState } from 'react';
import { Camera, Image, Tag, DollarSign, Text, FileText, Compass, Send } from 'lucide-react';

const categories = [
  'Books', 'Electronics', 'Dorm Essentials', 'Furniture', 'Apparel', 'Services', 'Other'
];

export default function SellingForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: 'used',
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Here you would typically send data to a backend API
    alert('Item listed successfully!');
  };

  const inputStyle = "w-full bg-white border border-gray-300 text-[#2B303B] rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#007BFF] transition-all duration-300 placeholder-gray-400";
  const labelStyle = "block text-[#2B303B] font-semibold text-lg mb-2 flex items-center";
  const iconStyle = "text-[#007BFF] mr-2";
  const sectionStyle = "bg-white border border-gray-200 rounded-xl p-8 shadow-sm mb-8";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* Basic Information */}
      <div className={sectionStyle}>
        <h2 className="text-3xl font-bold text-[#007BFF] mb-6">Product Details</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className={labelStyle}><Tag size={20} className={iconStyle} />Item Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., 'Thermodynamics Textbook'"
              className={inputStyle}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className={labelStyle}><Text size={20} className={iconStyle} />Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Describe the item, its condition, and any key features."
              className={inputStyle}
              required
            ></textarea>
          </div>
        </div>
      </div>
      
      {/* Pricing and Category */}
      <div className={sectionStyle}>
        <h2 className="text-3xl font-bold text-[#007BFF] mb-6">Pricing & Categorization</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className={labelStyle}><DollarSign size={20} className={iconStyle} />Price (₹)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 500"
              className={inputStyle}
              required
            />
          </div>
          <div>
            <label htmlFor="category" className={labelStyle}><Compass size={20} className={iconStyle} />Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`${inputStyle} appearance-none pr-8`}
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div className={sectionStyle}>
        <h2 className="text-3xl font-bold text-[#007BFF] mb-6">Item Photos</h2>
        <p className="text-gray-600 mb-4">Add high-quality photos to attract buyers.</p>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center transition-colors duration-300 hover:border-[#007BFF]">
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="flex flex-col items-center">
              <Camera size={48} className="text-[#007BFF] mb-2" />
              <span className="text-lg font-bold text-[#2B303B] mb-1">Drag & Drop or Click to Upload</span>
              <span className="text-sm text-gray-500">Maximum 5 images</span>
            </div>
            <input
              id="image-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        
        {/* Image Preview */}
        {formData.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
            {formData.images.map((file, index) => (
              <div key={index} className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-[#007BFF] text-white font-bold py-4 px-12 rounded-full text-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto"
        >
          <Send size={20} className="mr-3" />
          List Item Now
        </button>
      </div>
    </form>
  );
}
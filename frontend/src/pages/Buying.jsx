import React, { useState } from "react";
import ProductDetailModal from "../components/ProductDetailModal";

// Sample products list
const initialProducts = [
  { id: 1, name: 'Mathematics Book', price: '₹300', description: 'Basic concepts of algebra and calculus', longDescription: 'This book covers all essential mathematics topics needed for engineering students.', stockAvailable: 10, imageUrl: 'https://i.postimg.cc/br8XS78d/91lj-JFASpw-L-UF1000-1000-QL80.jpg', category: 'Books', sellerEmail: 'seller1@campus.edu', sellerName: 'Arun Kumar', sellerRollNumber: '24BIR099', reviews: [] },
  { id: 2, name: 'AUDRINO', description: 'Audrino in good working condition', stockAvailable: 2, imageUrl: 'https://img.scoop.it/o7D_VA_R46yW1NTIzu7XZ4XXXL4j3HpexhjNOf_P3YmryPKwJ94QGRtDb3Sbc6KY', category: 'Gadgets', sellerEmail: 'seller2@campus.edu', sellerName: 'Rahul Mehta', sellerRollNumber: '24CSE111', reviews: [] },
  { id: 3, name: 'Lecture Notes - Physics', price: '₹50', description: 'Handwritten physics notes', longDescription: 'Covers topics like mechanics, optics, and thermodynamics in detail.', stockAvailable: 20, imageUrl: 'https://i.postimg.cc/yN4zzg5F/cute-notes-ideas.jpg', category: 'Notes', sellerEmail: 'seller3@campus.edu', sellerName: 'Priya Sharma', sellerRollNumber: '24EEE042', reviews: [] },
  { id: 4, name: 'ULTRASONIC SENSOR', description: 'In good working condition', stockAvailable: 1, imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.Dri2ncw1XScULZrJFpKy2QHaEK?pid=Api&h=220&P=0', category: 'Dorm Essentials', sellerEmail: 'chris.t@college.edu', sellerName: 'Chris Taylor', sellerRollNumber: '22MEC078', reviews: [] },
  { id: 5, name: 'Java: A Beginner\'s Guide', price: '₹250', description: 'Comprehensive guide to learn Java from scratch. Great for first-year students.', longDescription: 'This is a well-known book for beginners in programming. It covers all the fundamental concepts of Java programming and includes practical examples. Lightly marked with notes on some pages.', stockAvailable: 1, imageUrl: 'https://i.postimg.cc/5y1NX2Y0/IMG-20250907-WA0013.jpg', category: 'Books', sellerEmail: 'sarah.l@college.edu', sellerName: 'Sarah Lim', sellerRollNumber: '24BIR055', reviews: [] },
  { id: 6, name: 'DRAFTER SCALE ', description: 'IN GOOD CONDITON ',stockAvailable: 1, imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.6tLhC3It9X8MdQxfpBjBZwHaFd?pid=Api&h=220&P=0', category: 'Electronics', sellerEmail: 'alex.k@college.edu', sellerName: 'Alex Kim', sellerRollNumber: '22CEB101', reviews: [] },
  { id: 7, name: 'GAS SENSOR',  description: 'In good working condition', stockAvailable: 1, imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.4ea4kuHQTeaJyijROKPM0AHaGh?pid=Api&h=220&P=0', category: 'Dorm Essentials', sellerEmail: 'emily.c@college.edu', sellerName: 'Emily Clark', sellerRollNumber: '24BTB067', reviews: [] },
  { id: 8, name: 'Modern Desk Lamp', price: '₹700', description: 'Adjustable light settings. Helps with late-night studies.', longDescription: 'Sleek and minimalist design with three brightness settings. The flexible neck allows you to focus light exactly where you need it. Energy-efficient LED bulb included.', stockAvailable: 1, imageUrl: 'https://i.postimg.cc/G2nbfmjQ/IMG-20250907-WA0021.jpg', category: 'Furniture', sellerEmail: 'david.b@college.edu', sellerName: 'David Brown', sellerRollNumber: '24CAB082', reviews: [] },
  { id: 9, name: 'The Great Gatsby', price: '₹100', description: 'Required reading for English literature. Good condition.', longDescription: 'Classic novel by F. Scott Fitzgerald. This copy is in good condition with no torn pages or highlighting. Perfect for your literature course.', stockAvailable: 1, imageUrl: 'https://i.postimg.cc/2jbKBQRL/IMG-20250907-WA0024.jpg', category: 'Books', sellerEmail: 'olivia.m@college.edu', sellerName: 'Olivia Miller', sellerRollNumber: '24ENB099', reviews: [] },
  { id: 10, name: 'Digital Graphics Tablet', price: '₹8,500', description: 'Wacom Intuos, great for digital art and design classes.', longDescription: 'This Wacom tablet is perfect for digital painting, photo editing, and design projects. It includes the pressure-sensitive pen and all original cables. Used only a few times.', stockAvailable: 1, imageUrl: 'https://i.postimg.cc/zfxcTpGK/IMG-20250907-WA0023.jpg', category: 'Electronics', sellerEmail: 'daniel.w@college.edu', sellerName: 'Daniel White', sellerRollNumber: '23DAB043', reviews: [] },
  { id: 11, name: 'IR SENSOR', description: 'In good working condition.', stockAvailable: 1, imageUrl: 'https://robu.in/wp-content/uploads/2020/05/robu-3-768x768-1.jpg', category: 'Apparel', sellerEmail: 'sophia.g@college.edu', sellerName: 'Sophia Garcia', sellerRollNumber: '24PEB022', reviews: [] },
  { id: 12, name: 'RASPBERRY PI', description: 'In good working condition.', stockAvailable: 1, imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.SY7yrUxp-2vMuppSfBS-pgHaFF?pid=Api&h=220&P=0', category: 'Music', sellerEmail: 'liam.p@college.edu', sellerName: 'Liam Perez', sellerRollNumber: '23MUB045', reviews: [] },
  { id: 13, name: 'Thermodynamics Textbook', price: '₹400', description: 'Eighth edition, in good condition. For engineering students.', longDescription: 'Required textbook for Thermodynamics (ME-201). The pages are clean with no highlighting. A few minor scuffs on the cover but otherwise in great shape.', stockAvailable: 1, imageUrl: 'https://i.postimg.cc/TYd3GhvN/IMG-20250907-WA0017.jpg', category: 'Books', sellerEmail: 'chloe.w@college.edu', sellerName: 'Chloe Walker', sellerRollNumber: '23MEC091', reviews: [] },
  { id: 14, name: 'Wireless Headphones', price: '₹6,000', description: 'Bose QuietComfort 35 II. Excellent sound quality and noise cancellation.', longDescription: 'Premium over-ear wireless headphones with industry-leading noise cancellation. Perfect for studying in a loud dorm or library. Battery lasts up to 20 hours. Comes with charging cable and carrying case.', stockAvailable: 1, imageUrl: 'https://i.postimg.cc/5y39LWLm/IMG-20250907-WA0016.jpg', category: 'Electronics', sellerEmail: 'benjamin.h@college.edu', sellerName: 'Benjamin Hall', sellerRollNumber: '23ITB112', reviews: [] },
  { id: 15, name: 'Dumbbell Set (5kg-20kg)', price: '₹7,500', description: 'Adjustable dumbbell set, great for home workouts in your dorm.', longDescription: 'Adjustable dumbbell set with a weight range from 5kg to 20kg. The compact design is perfect for small spaces. Includes a storage rack. In excellent condition.', stockAvailable: 1, imageUrl: 'https://i.postimg.cc/kMFgkKzt/IMG-20250907-WA0015.jpg', category: 'Sports', sellerEmail: 'mia.j@college.edu', sellerName: 'Mia Johnson', sellerRollNumber: '24PEB089', reviews: [] },
  { id: 16, name: 'Mini Drone', price: '₹3,000', description: 'Ryze Tello drone, perfect for aerial photography practice.', longDescription: 'A lightweight and easy-to-fly mini drone. Great for beginners to practice flying and aerial photography. Comes with two extra batteries and prop guards.', stockAvailable: 1, imageUrl: 'https://i.postimg.cc/bJ1cJz7K/maxresdefault.jpg', category: 'Electronics', sellerEmail: 'jacob.b@college.edu', sellerName: 'Jacob Black', sellerRollNumber: '22EEB071', reviews: [] },
  { id: 17, name: 'C++ Programming Principles', price: '₹450', description: 'Beginner-friendly book, a classic for computer science students.', longDescription: 'A classic and highly recommended textbook for learning C++. It covers fundamental programming principles and object-oriented concepts. Lightly used, no highlighting.', stockAvailable: 1, imageUrl: 'https://i.postimg.cc/SRM1Fh7f/IMG-20250907-WA0026.jpg', category: 'Books', sellerEmail: 'ava.p@college.edu', sellerName: 'Ava Perez', sellerRollNumber: '24BIR098', reviews: [] },
  { id: 18, name: 'Campus-wide Photography Service', price: '₹Varies', description: 'Need photos for your event or profile? Professional photographer at your service.', longDescription: 'Experienced student photographer offering services for events, portraits, and headshots on campus. Flexible pricing based on your needs. Contact me to discuss your project!', stockAvailable: 1, imageUrl: 'https://i.postimg.cc/zGQ9Fb5s/pngtree-antique-nostalgic-camera-poster-psd-layered-background-picture-image-1017963.png', category: 'Services', sellerEmail: 'ethan.r@college.edu', sellerName: 'Ethan Roberts', sellerRollNumber: '23CEB156', reviews: [] },
  
  
];

const getImageUrl = (url) => {
  if (!url) return "https://via.placeholder.com/300x200?text=No+Image";

  if (url.includes("postimg.cc/") && !url.includes("i.postimg.cc/")) {
    const parts = url.split("/");
    const identifier = parts[parts.length - 1];
    return `https://i.postimg.cc/${identifier}.jpg`;
  }

  return url;
};

export default function Buying() {
  const [products] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [activeProduct, setActiveProduct] = useState(null);

  const categories = ["All", "Books", "Gadgets", "Notes", "Courses", "Music", "Electronics", "Apparel", "Sports", "Furniture", "Dorm Essentials", "Services"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white text-[#2B303B] p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#2B303B]">CampusKART - Buy Items</h1>

      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded-lg bg-white border border-gray-300 text-[#2B303B] w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="p-2 rounded-lg bg-white border border-gray-300 text-[#2B303B] focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm cursor-pointer hover:scale-105 hover:shadow-md hover:border-[#007BFF] transition-all duration-300"
            onClick={() => setActiveProduct(product)}
          >
            <img
              src={getImageUrl(product.imageUrl)}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                console.error(`Failed to load image: ${product.imageUrl}`);
              }}
            />
            <h3 className="text-[#2B303B] font-bold text-lg">{product.name}</h3>
            <p className="text-[#007BFF] font-semibold text-sm">{product.price}</p>
            <p className="text-gray-500 text-xs mt-2">Click for details</p>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-xl">No products found matching your criteria</p>
        </div>
      )}
      {activeProduct && (
        <ProductDetailModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
        />
      )}
    </div>
  );
}
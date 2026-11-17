import React from 'react';

const MapButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-20 z-50 p-4 text-white font-bold bg-[#007BFF] rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
    >
       Map
    </button>
  );
};

export default MapButton;
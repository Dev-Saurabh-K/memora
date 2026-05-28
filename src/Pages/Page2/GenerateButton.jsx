import React from 'react';

const GenerateButton = ({ onClick, disabled, currentSelection }) => {
  return (
    <button 
      className={`text-stone-50 w-40 h-10 mt-10 md:mt-8 lg:mt-8 bg-green-900 rounded-lg font-semibold shadow-(--primary-color) hover:shadow-(--hover-color) transition-all duration-300 ${
        disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:bg-green-800 cursor-pointer'
      }`} 
      onClick={onClick} 
      disabled={disabled}
    >
      Generate Plan
    </button>
  );
};

export default GenerateButton;
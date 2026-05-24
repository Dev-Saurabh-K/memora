import React from 'react';

export default function Logo({ className = "h-10 w-auto" }) {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap');
          .memora-font {
            font-family: 'Comfortaa', sans-serif;
          }
        `}
      </style>

      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 240 60" 
        className={`select-none ${className}`}
      >
        <text 
          x="0" 
          y="50" 
          fill="#0d7736" 
          fontSize="56"
          letterSpacing="1"
          className=" font-bold"
        >
          memora
        </text>
      </svg>
    </>
  );
}
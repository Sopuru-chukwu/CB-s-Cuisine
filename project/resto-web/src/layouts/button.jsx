import React from "react";

const Button = ({ title, onClick }) => {
  console.log("Button rendered with title:", title);
  return (
    <button 
      className="px-6 py-1 border-2 border-brightColor text-brightColor hover:bg-brightColor hover:text-white transition-all rounded-full"
      onClick={(e) => {
        console.log("Button clicked:", title);
        onClick(e);
      }}
    >
      {title}
    </button>
  );
};

export default Button;

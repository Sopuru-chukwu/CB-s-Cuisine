import React from "react";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import Button from "./button";

const DishesCard = ({ img, title, price, addToCart }) => {
  return (
    <div className="max-w-xs p-6 shadow-[rgba(0,_0,_0,_0.9)_0px_3px_8px] rounded-lg">
      {/* Display the image */}
      <img className="w-full h-48 object-cover rounded-lg" src={img} alt={title} />
      <div className="space-y-4">
        {/* Display the title */}
        <h3 className="font-semibold text-center text-xl pt-6">{title}</h3>
        
        {/* Display star ratings */}
        <div className="flex flex-row justify-center">
          <BsStarFill className="text-brightColor" />
          <BsStarFill className="text-brightColor" />
          <BsStarFill className="text-brightColor" />
          <BsStarFill className="text-brightColor" />
          <BsStarHalf className="text-brightColor" />
        </div>
        
        {/* Display price and Add to Cart button */}
        <div className="flex flex-row items-center justify-center gap-4">
          <h3 className="font-semibold text-lg">{price}</h3>
          <Button
            title="Add to cart"
            onClick={() => {
              console.log("Add to cart clicked for:", title); // Log title for debugging
              addToCart({ img, title, price }); // Pass dish details to addToCart function
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DishesCard;

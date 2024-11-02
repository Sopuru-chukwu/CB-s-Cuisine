import React, { useState, useEffect, useContext } from "react";
import DishesCard from "../layouts/DishesCard";
import axios from "axios";
import { toast } from "react-toastify"; 
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Dishes = () => {
  const [dishes, setDishes] = useState([]);
  const { addToCart, updateCartItemQuantity, removeFromCart, cartItems } =
    useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get("http://localhost/restoweb/api/getDishes.php");
        setDishes(response.data);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();
  }, []);

  const handleAddToCart = (dish) => {
    addToCart(dish);
    toast.success(
      <div>
        <p>{dish.title} added to cart!</p>
        <button
          className="bg-brightColor text-white py-1 px-3 rounded mt-2"
          onClick={() => navigate("/cart")}
        >
          View Cart
        </button>
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5">
      <div className="pt-24 pb-10">
        <h1 className="text-4xl font-semibold text-center">Our Dishes</h1>
        <hr className="w-60 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
      </div>
      <div className="flex flex-wrap gap-7 justify-center">
        {dishes.slice(0, 6).map((dish) => ( // Limit to first six dishes
          <DishesCard
            key={dish.dish_id}
            img={dish.img} // Pass the img URL from the database
            title={dish.title}
            price={dish.price}
            addToCart={() => handleAddToCart(dish)}
            increaseQuantity={() =>
              updateCartItemQuantity(
                dish.dish_id,
                cartItems.find((item) => item.dish_id === dish.dish_id)
                  ?.quantity + 1 || 1 
              )
            }
            decreaseQuantity={() =>
              updateCartItemQuantity(
                dish.dish_id,
                cartItems.find((item) => item.dish_id === dish.dish_id)
                  ?.quantity - 1 || 1
              )
            }
            remove={() => removeFromCart(dish.dish_id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dishes;

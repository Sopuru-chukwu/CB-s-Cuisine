import React, { useState, useEffect, useContext } from "react";
import DishesCard from "../layouts/DishesCard";
import axios from "axios";
import { CartContext } from "../context/CartContext"; // Import the CartContext
import { toast } from "react-toastify"; // Import toast for notifications
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const { addToCart, updateCartItemQuantity, removeFromCart, cartItems } =
    useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get(
          "http://localhost/restoweb/api/getDishes.php"
        );
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
    <div className="flex flex-col justify-center items-center lg:px-32 px-5 pt-1 pb-5">
      <h1 className="text-4xl font-semibold text-center pb-5">Premium Menu</h1>
      <hr className="w-60 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
      <div className="flex flex-wrap gap-8 justify-center">
        {dishes.slice(0, 3).map((dish) => (
          <DishesCard
            key={dish.dish_id}
            img={dish.img}
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

export default Menu;

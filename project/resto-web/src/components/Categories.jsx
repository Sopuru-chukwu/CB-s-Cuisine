import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Logo from "../assets/img/logo.png";
import DishesCard from "../layouts/DishesCard";
import AOS from "aos";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../context/CartContext";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const dishesPerPage = 12;
  const [dishes, setDishes] = useState([]);
  const { addToCart, updateCartItemQuantity, removeFromCart, cartItems } =
    useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 2000, easing: "ease-in-out", once: true });
  }, []);

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

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  const totalPages = Math.ceil(filteredDishes.length / dishesPerPage);
  const indexOfLastDish = currentPage * dishesPerPage;
  const indexOfFirstDish = indexOfLastDish - dishesPerPage;
  const currentDishes = filteredDishes.slice(indexOfFirstDish, indexOfLastDish);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleAddToCart = (dish) => {
    console.log("Dish being added:", dish); // Log dish details for debugging
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
    <div className="flex flex-col min-h-screen">
      <ToastContainer />
      <Navbar />
      <main
        className="flex flex-grow items-center justify-center bg-gray-100 py-8 px-16 pt-20"
        data-aos="fade-up"
      >
        <div className="flex flex-col items-center w-full max-w-6xl m-4">
          <div className="mb-8">
            <img src={Logo} alt="CB's Cuisine Logo" className="w-48 h-48" />
          </div>

          {/* Filter Buttons */}
          <div className="mb-8">
            <button
              className={`mx-2 py-2 px-4 rounded ${
                selectedCategory === "All"
                  ? "bg-brightColor text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => {
                setSelectedCategory("All");
                setCurrentPage(1);
              }}
            >
              All
            </button>
            <button
              className={`mx-2 py-2 px-4 rounded ${
                selectedCategory === "Fast Food"
                  ? "bg-brightColor text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => {
                setSelectedCategory("Fast Food");
                setCurrentPage(1);
              }}
            >
              Fast Food
            </button>
            <button
              className={`mx-2 py-2 px-4 rounded ${
                selectedCategory === "Main Course"
                  ? "bg-brightColor text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => {
                setSelectedCategory("Main Course");
                setCurrentPage(1);
              }}
            >
              Main Course
            </button>
            <button
              className={`mx-2 py-2 px-4 rounded ${
                selectedCategory === "Salad"
                  ? "bg-brightColor text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => {
                setSelectedCategory("Salad");
                setCurrentPage(1);
              }}
            >
              Salad
            </button>
          </div>

          {/* Flex layout for cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentDishes.map((dish) => (
              <DishesCard
                key={dish.dish_id}
                img={dish.img} // Pass the img URL directly
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

          {/* Pagination Controls */}
          <div className="mt-8 flex justify-center space-x-4">
            <button
              className="px-4 py-2 bg-brightColor text-white rounded"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-brightColor text-white rounded"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Categories;

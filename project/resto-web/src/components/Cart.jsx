import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo.png";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const numericPrice = parseFloat(item.price.replace(/[^\d.-]/g, ""));
      return total + numericPrice * item.quantity;
    }, 0);
  };

  const handleQuantityChange = (dish_id, newQuantity) => {
    if (newQuantity > 0) {
      updateCartItemQuantity(dish_id, newQuantity);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="relative flex items-center justify-center bg-gray-100 py-8 pt-20">
        <div className="absolute top-0 left-0 w-full flex justify-center pt-24">
          <img
            src={Logo}
            alt="CB's Cuisine Logo"
            className="w-48 h-48 object-contain"
          />
        </div>

        <div className="flex flex-col w-full max-w-6xl mt-20 pt-24">
          <div className="flex flex-col items-center py-8">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            {cartItems.length > 0 ? (
              <>
                <div className="w-full max-w-6xl space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.dish_id}
                      className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg w-full"
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-20 h-20"
                      />
                      <div className="flex-1 mx-4">
                        <h2 className="font-semibold text-lg">{item.title}</h2>
                        <p className="text-gray-600">Price: #{item.price}</p>
                        <div className="flex items-center">
                          <button
                            className="px-2 py-1 bg-gray-200 rounded"
                            onClick={() =>
                              handleQuantityChange(item.dish_id, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            className="px-2 py-1 bg-gray-200 rounded"
                            onClick={() =>
                              handleQuantityChange(item.dish_id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => removeFromCart(item.dish_id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="w-full max-w-6xl mt-8 flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Total: #{calculateTotalPrice().toFixed(2)}</h2>
                  <button
                    className="bg-green-500 text-white py-2 px-6 rounded"
                    onClick={() => navigate("/checkout")}
                  >
                    Checkout
                  </button>
                </div>
              </>
            ) : (
              <p>Your cart is empty!</p>
            )}
            <button
              className="bg-brightColor text-white py-2 px-6 mt-6 rounded"
              onClick={() => navigate("/")}
            >
              Back to Menu
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;

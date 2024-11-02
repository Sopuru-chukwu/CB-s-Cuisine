import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [userId, setUserId] = useState(() => localStorage.getItem("userId"));

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const handleStorageChange = () => {
      setUserId(localStorage.getItem("userId"));
      setCartItems(JSON.parse(localStorage.getItem("cartItems") || "[]"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const addToCart = (dish) => {
    if (!dish.dish_id || !dish.title || !dish.price || !dish.img) {
      console.error("Error: Missing fields in dish:", dish);
      return;
    }
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.dish_id === dish.dish_id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.dish_id === dish.dish_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...dish, quantity: 1 }];
      }
    });
  };
  

  const removeFromCart = (dish_id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.dish_id !== dish_id)
    );
  };

  const updateCartItemQuantity = (dish_id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.dish_id === dish_id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => { 
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        userId,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};  

import React, { useState, useEffect, useContext } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo.png";
import { AiOutlineClose, AiOutlineMenuUnfold } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import Button from "../layouts/button";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("loggedin") === "true";
    const storedEmail = localStorage.getItem("userEmail");
    setIsLoggedIn(loggedInStatus);
    if (loggedInStatus && storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost/restoweb/api/logout.php", {
        method: "POST",
      });
      const result = await response.json();

      if (result.success) {
        localStorage.removeItem("loggedin");
        localStorage.removeItem("userEmail");
        setIsLoggedIn(false);
        clearCart(); // Clear the cart when logging out
        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleChange = () => setMenu(!menu);
  const closeMenu = () => setMenu(false);

  return (
    <div className="fixed w-full z-50">
      <div className="px-5 py-4 md:px-32">
        <div className="flex flex-row justify-between p-5 md:px-32 px-5 bg-white shadow rounded-xl">
          <div className="flex flex-row items-center cursor-pointer">
            <img
              src={Logo}
              alt="CB's Cuisine Logo"
              className="w-14 h-14 object-contain"
            />
            <h1 className="text-xl font-semibold">CB's Cuisine</h1>
          </div>

          <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
            <RouterLink to="/" className="hover:text-brightColor">
              Home
            </RouterLink>
            <RouterLink
              to="/categories"
              className="hover:text-brightColor"
              onClick={closeMenu}
            >
              Menu
            </RouterLink>
            <ScrollLink
              to="about"
              spy
              smooth
              duration={500}
              className="hover:text-brightColor"
            >
              About
            </ScrollLink>
            <ScrollLink
              to="reviews"
              spy
              smooth
              duration={500}
              className="hover:text-brightColor"
            >
              Reviews
            </ScrollLink>
            <RouterLink to="/contact" className="hover:text-brightColor">
              Contact
            </RouterLink>
            <RouterLink to="/cart" className="hover:text-brightColor relative">
              <FiShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brightColor text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </RouterLink>

            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="px-6 py-1 border-2 border-brightColor text-brightColor hover:bg-brightColor hover:text-white transition-all rounded-full"
                >
                  Logout
                </button>
                {/* Display the first two characters of the user's email in a circle */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brightColor text-white font-bold mr-4">
                  {userEmail.slice(0, 2).toUpperCase()}{" "}
                  {/* Get first 2 characters and make uppercase */}
                </div>
              </>
            ) : (
              <RouterLink to="/login">
                <Button title="Login" />
              </RouterLink>
            )}
          </nav>

          <div className="md:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={25} onClick={handleChange} />
            ) : (
              <AiOutlineMenuUnfold size={25} onClick={handleChange} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Logout = () => {
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await fetch("http://localhost/restoweb/api/logout.php", {
          method: "POST",
          credentials: "include",
        });
        const result = await response.json();
        if (result.success) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          clearCart(); // Clear the cart when logging out
          navigate("/login");
        } else {
          console.error("Logout failed: ", result.message);
        }
      } catch (error) {
        console.error("Error during logout: ", error);
      }
    };
    handleLogout();
  }, [navigate, clearCart]);

  return <div>Logging out...</div>;
};

export default Logout;

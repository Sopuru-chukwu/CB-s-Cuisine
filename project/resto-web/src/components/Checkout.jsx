import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import Navbar from "./Navbar";

const Checkout = () => {
  const { cartItems, userId, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const publicKey = "pk_test_1ee7a4942318fbad2839ecce0e09ab771332d656";

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("loggedin") === "true";
    setIsLoggedIn(loggedInStatus);

    if (!loggedInStatus || !userId) {
      navigate("/login");
    }
  }, [navigate, userId]);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const numericPrice = parseFloat(item.price.replace(/[^\d.-]/g, ""));
      return total + numericPrice * item.quantity;
    }, 0);
  };

  const totalAmount = calculateTotalPrice() * 100;

  const onSuccess = async (reference) => {
    if (!userId) {
      alert("User ID missing! Redirecting to login.");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);

    const shippingInfo = {
      full_name: fullName,
      phone_number: phoneNumber,
      street_address: streetAddress,
      city,
      postal_code: postalCode,
      country,
      cart_items: cartItems.map((item) => ({
        dish_id: item.dish_id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        img: item.img,
      })),
      total_price: calculateTotalPrice(),
      user_id: userId,
      reference: reference.reference,
    };

    try {
      const response = await fetch(
        "http://localhost/restoweb/api/verify-payment.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(shippingInfo),
        }
      );

      const textResponse = await response.text();
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const result = JSON.parse(textResponse);
        if (result.success) {
          clearCart(); // Clear the cart on successful checkout
          navigate("/");
        } else {
          console.error("Order failed:", result.message);
          alert("Order placement failed: " + result.message);
        }
      } else {
        console.error("Non-JSON response from server:", textResponse);
        alert(
          "An unexpected error occurred. Please check the console for details."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during order placement.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onClose = () => {
    console.log("Payment closed");
    alert("Payment was not completed");
  };

  const componentProps = {
    email: "customer@example.com",
    amount: totalAmount,
    publicKey,
    text: "Pay Now",
    onSuccess,
    onClose,
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="checkout-container bg-gray-50 min-h-screen pt-24">
        <div className="max-w-5xl mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* Order Summary */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <ul className="space-y-4">
                {cartItems.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-lg font-semibold">
                      #
                      {(
                        parseFloat(item.price.replace(/[^\d.-]/g, "")) *
                        item.quantity
                      ).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-right">
                <p className="text-xl font-bold">
                  Total: #{calculateTotalPrice().toFixed(2)}
                </p>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="shipping-info">
              <h2 className="text-2xl font-semibold mb-4">
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input-field w-full border p-2 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="+123456789"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="input-field w-full border p-2 rounded-lg mt-1"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <input
                    type="text"
                    placeholder="123 Main St"
                    required
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="input-field w-full border p-2 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input-field w-full border p-2 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Postal/ZIP Code
                  </label>
                  <input
                    type="text"
                    placeholder="12345"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="input-field w-full border p-2 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    placeholder="Country"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="input-field w-full border p-2 rounded-lg mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Paystack Payment Button */}
            <div className="payment-info">
              <h2 className="text-2xl font-semibold mb-4">
                Payment Information
              </h2>
              <PaystackButton
                {...componentProps}
                className={`${
                  isSubmitting
                    ? "bg-gray-400"
                    : "bg-green-500 hover:bg-green-600"
                } text-white py-2 px-6 rounded-lg w-full`}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Logo from "../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [sessionError, setSessionError] = useState("");
  const navigate = useNavigate(); // Added useNavigate for navigation

  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous error and success messages
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setSessionError("");
    setSuccessMessage("");

    // Validate that passwords match
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirm-password", confirmPassword);

    try {
      const response = await fetch("http://localhost/restoweb/api/signup.php", {
        method: "POST",
        body: formData,
      });

      const responseText = await response.text(); // Get the raw text response
      console.log("Raw Response:", responseText); // Log the raw response to debug

      try {
        const result = JSON.parse(responseText); // Parse the response as JSON
        console.log("Parsed JSON:", result);

        if (result.success) {
          setSuccessMessage(result.message);
          navigate("/login"); // Redirect to login on successful signup
        } else {
          // Set form validation errors
          if (result.message.email) {
            setEmailError(result.message.email);
          }
          if (result.message.password) {
            setPasswordError(result.message.password);
          }
          if (result.message["confirm-password"]) {
            setConfirmPasswordError(result.message["confirm-password"]);
          }

          if (typeof result.message === "string") {
            setSessionError(result.message);
          }
        }
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        setSessionError("Invalid response from the server. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSessionError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-100 py-8 pt-20" data-aos="fade-up">
        <div className="flex flex-col items-center w-full max-w-6xl m-4">
          <div className="mb-8">
            <img src={Logo} alt="CB's Cuisine Logo" className="w-48 h-48 object-contain" />
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative">
            <h2 className="text-3xl font-bold text-center text-brightColor mb-2">
              Create an Account!
            </h2>
            <p className="text-center text-gray-500 mb-6">Sign up to get started.</p>

            {successMessage && (
              <div className="bg-green-100 border border-green-500 text-green-700 px-4 py-3 rounded relative mb-4">
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> {successMessage}</span>
              </div>
            )}

            {sessionError && (
              <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded relative mb-4">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {sessionError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4 relative">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2 focus:ring-red-500 focus:border-red-500 border ${
                    emailError ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  placeholder="johndoe@example.com"
                  required
                />
                {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
              </div>

              <div className="mb-4 relative">
                <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-2 focus:ring-red-500 focus:border-red-500 border ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  placeholder="Your password"
                  required
                />
                {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
              </div>

              <div className="mb-4 relative">
                <label htmlFor="confirm-password" className="block text-gray-700 mb-2">Confirm Password</label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-2 focus:ring-red-500 focus:border-red-500 border ${
                    confirmPasswordError ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  placeholder="Confirm password"
                  required
                />
                {confirmPasswordError && <p className="text-red-500 text-sm mt-2">{confirmPasswordError}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-brightColor text-white py-2 px-4 rounded-md hover:bg-opacity-90"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;

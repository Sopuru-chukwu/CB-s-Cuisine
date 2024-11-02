import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Logo from "../assets/img/logo.png";
import AOS from "aos";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [sessionSuccess, setSessionSuccess] = useState("");
  const [sessionError, setSessionError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 2000, easing: "ease-in-out", once: true });

    // Clear form fields when the login page loads
    setEmail("");
    setPassword("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setSessionError("");
    setSessionSuccess("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch("http://localhost/restoweb/api/login.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSessionSuccess(result.message);
        localStorage.setItem("loggedin", "true");
        localStorage.setItem("userEmail", email); 
        localStorage.setItem("userId", result.userId); 
        navigate("/");
      } else {
        if (result.message.email) setEmailError(result.message.email);
        if (result.message.password) setPasswordError(result.message.password);
        if (typeof result.message === "string") setSessionError(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setSessionError("Something went wrong, please try again."); 
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main
        className="flex-grow flex items-center justify-center bg-gray-100 py-8 pt-20"
        data-aos="fade-up"
      >
        <div className="flex flex-col items-center w-full max-w-6xl m-4">
          <div className="mb-8">
            <img
              src={Logo}
              alt="CB's Cuisine Logo"
              className="w-48 h-48 object-contain"
            />
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative">
            <h2 className="text-3xl font-bold text-center text-brightColor mb-2">
              Welcome Back!
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Login to your account.
            </p>

            <form onSubmit={handleSubmit}>
              {sessionSuccess && (
                <div className="bg-green-100 border border-green-500 text-green-700 px-4 py-3 rounded relative mb-4">
                  <strong className="font-bold">Success!</strong>
                  <span className="block sm:inline"> {sessionSuccess}</span>
                </div>
              )}

              {sessionError && (
                <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded relative mb-4">
                  <strong className="font-bold">Error!</strong>
                  <span className="block sm:inline"> {sessionError}</span>
                </div>
              )}

              <div className="mb-4 relative">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2 focus:ring-red-500 focus:border-red-500 border ${
                    emailError ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  placeholder="johndoe@example.com"
                  required
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-2">{emailError}</p>
                )}
              </div>

              <div className="mb-6 relative">
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-2 focus:ring-red-500 focus:border-red-500 border ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  placeholder="Password"
                  required
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-brightColor text-white py-2 rounded-full hover:bg-white hover:text-brightColor border-2 border-brightColor transition duration-200"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center text-gray-500">Or Login With</div>
            <div className="flex justify-center mt-4 space-x-4">
              <button className="bg-blue-600 text-white rounded-full p-2">
                <FaFacebookF size={24} />
              </button>
              <button className="bg-white text-black border border-gray-300 rounded-full p-2">
                <FcGoogle size={24} />
              </button>
              <button className="bg-blue-400 text-white rounded-full p-2">
                <FaTwitter size={24} />
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-500">Don't have an account?</p>
              <Link to="/signup" className="text-brightColor hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;

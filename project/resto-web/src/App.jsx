import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dishes from "./components/Dishes";
import About from "./components/About";
import Menu from "./components/Menu";
import Reviews from "./components/Reviews";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Categories from "./components/Categories";
import AOS from "aos";
import "aos/dist/aos.css";
import Contact from "./components/Contact";
import { CartProvider } from "./context/CartContext";
import Checkout from "./components/Checkout";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications

const MainPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 2500,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div>
      <Navbar />
      <main>
        <div id="home" data-aos="fade-up">
          <Home />
        </div>
        <div id="dishes" data-aos="fade-up">
          <Dishes />
        </div>
        <div id="about" data-aos="fade-left">
          <About />
        </div>
        <div id="menu" data-aos="fade-up">
          <Menu />
        </div>
        <div id="reviews" data-aos="zoom-in">
          <Reviews />
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <CartProvider>
      <Router>
        <ToastContainer 
          position="top-right" // Position the toast at the top-right
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }} // Ensure it appears above other elements
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;

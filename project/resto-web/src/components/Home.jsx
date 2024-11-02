import React, { useState, useEffect } from "react";
import Button from "../layouts/button";
import heroImage1 from '../assets/img/Frame 1.png';
import heroImage2 from '../assets/img/hero.jpg';
import heroImage3 from '../assets/img/hero21 1.png';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carousel items array
  const carouselItems = [
    {
      title: "Elevate Your Inner Foodie With Every Bite!",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit quam ipsa eligendi id, consequatur a numquam earum et dolorum consectetur!",
      backgroundImage: heroImage1,
    },
    {
      title: "Discover The Taste Of Exquisite Cuisine!",
      description: "Delight your senses with our carefully crafted dishes made from the freshest ingredients.",
      backgroundImage: heroImage2,
    },
    {
      title: "Indulge In The Ultimate Dining Experience!",
      description: "From spicy to crispy, enjoy the best food that satisfies every craving.",
      backgroundImage: heroImage3,
    },
  ];

  // Auto-change carousel every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 5000); // 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Function to go to previous item
  const handlePrevClick = () => {
    setCurrentIndex(
      (currentIndex - 1 + carouselItems.length) % carouselItems.length
    );
  };

  // Function to go to next item
  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % carouselItems.length);
  };

  return (
    <div className="relative min-h-screen">
      <div
        className="relative min-h-screen flex flex-row justify-between items-center lg:px-32 px-5 bg-cover bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url(${carouselItems[currentIndex].backgroundImage})`,
        }}
      >
        {/* Opaque overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative w-full lg:w-2/3 space-y-5 z-10">
          <h1 className="text-white font-semibold text-6xl">
            {carouselItems[currentIndex].title}
          </h1>
          <p className="text-white">
            {carouselItems[currentIndex].description}
          </p>
          <div className="lg:pl-44">
            <Button title="Order Now" />
          </div>
        </div>

        {/* Carousel controls */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-20 bg-black p-2 rounded-full"
          onClick={handlePrevClick}
        >
          &lt;
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-20 bg-black p-2 rounded-full"
          onClick={handleNextClick}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Home;

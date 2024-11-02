import React, { useState, useEffect } from 'react';
import ReviewCard from '../layouts/ReviewCard';
import img1 from '../assets/img/pic1.png';

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    { img: img1, name: 'Emmanuel Martins' },
    { img: img1, name: 'Sarah Johnson' },
    { img: img1, name: 'Michael Smith' }
  ];

  // Automatically move to the next review every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // Cleanup the interval
  }, [reviews.length]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center md:px-32 px-5">
      <h1 className="text-4xl font-semibold text-center justify-center md:px-32 px-5">
        Customer's Review
      </h1>
      <hr className="w-60 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />

      <div className="relative w-full mt-5 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {reviews.map((review, index) => (
            <div key={index} className="min-w-full flex justify-center">
              <ReviewCard img={review.img} name={review.name} />
            </div>
          ))}
        </div>
      </div>

      {/* Optionally add navigation buttons */}
      <div className="mt-5 flex gap-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-blue-600' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Reviews;

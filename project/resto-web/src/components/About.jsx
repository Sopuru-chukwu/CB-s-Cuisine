import React from "react";
import about from "../assets/img/about.png";
import Button from "../layouts/button";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center lg:px-32 px-5 pt-10 pb-2">
      <img src={about} alt="Delicious food display" />

      <div className="space-y-4 lg:pt-10">
        <h1 className="font-semibold text-4xl text-center md:text-start">
          Why Choose Us
        </h1>
        <p>
          At CB's Cuisine, we believe that great food brings people together. Our menu is crafted with love and passion, featuring only the freshest ingredients sourced locally. 
        </p>
        <p>
          Our chefs are dedicated to creating mouth-watering dishes that celebrate culinary traditions while offering a modern twist. Whether you're craving a hearty meal or a light snack, we have something for everyone.
        </p>
        <p>
          Join us for an unforgettable dining experience where flavor meets warmth and hospitality. We are not just a restaurant; we are a community hub where friends and families gather to create lasting memories.
        </p>
        <div className="flex justify-center lg:justify-start">
          <Button title="Learn More" />
        </div>
      </div>
    </div>
  );
};

export default About;

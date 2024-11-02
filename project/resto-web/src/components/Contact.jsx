import React from "react";
import { FiPhone } from "react-icons/fi"; // Phone icon from react-icons
import { MdEmail } from "react-icons/md"; // Email icon from react-icons
import Logo from "../assets/img/logo.png"; // You can update this to your logo path
import Footer from "./Footer";

const Contact = () => {
  return (
    <main className="bg-gray-100 py-8 pt-20">
      <div className="contact-page section py-12 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info Section */}
            <div>
              <div className="section-heading mb-8">
                <h6 className="text-lg font-bold uppercase text-brightColor">
                  | Contact Us
                </h6>
                <h2 className="text-3xl font-bold mt-2">
                  Get In Touch With Us
                </h2>
              </div>
              <p className="text-gray-600 mb-8">
                We would love to hear from you! Whether you have a question about our menu, need assistance with a reservation, or want to share your dining experience, our team is here to help. We pride ourselves on our customer service and are eager to assist you in any way possible.
              </p>
              <div className="space-y-6">
                <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
                  <FiPhone size={52} className="text-brightColor" />
                  <h6 className="ml-4 text-xl font-bold">
                    010-020-0340
                    <br />
                    <span className="text-gray-500 text-sm">Call Us</span>
                  </h6>
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
                  <MdEmail size={52} className="text-brightColor" />
                  <h6 className="ml-4 text-xl font-bold">
                    info@CB's Cuisine.com
                    <br />
                    <span className="text-gray-500 text-sm">Email Us</span>
                  </h6>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div>
              <form
                id="contact-form"
                action=""
                method="post"
                className="bg-white p-8 rounded-lg shadow-md"
              >
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your Name..."
                      className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Your E-mail..."
                      className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      placeholder="Subject..."
                      className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      placeholder="Your Message"
                      className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      rows="4"
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      id="form-submit"
                      className="w-full py-3 px-6 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Google Map Section */}
            <div className="col-span-full mt-8">
              <div id="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79235.9330131207!2d7.414069295778528!3d10.4421774375688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104d4987d93f1e81%3A0x44f10e2d7193f110!2sSabon%20Tasha%20800104%2C%20Kaduna%2C%20Nigeria!5e1!3m2!1sen!2sth!4v1729191722830!5m2!1sen!2sth"
                  width="100%"
                  height="500"
                  frameBorder="0"
                  className="border-0 rounded-lg shadow-md"
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Contact;

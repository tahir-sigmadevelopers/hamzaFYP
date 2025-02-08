import React from "react";

const HomeBanner = () => {
  return (
    <div
      className="bg-cover  bg-center h-[70vh] flex flex-col justify-center items-center text-center relative"
      style={{
        backgroundImage:
          "url('/banner.jpg')",
          opacity:0.99
      }}
    >
      <div className="bg-black bg-opacity-40 absolute inset-0"></div>
      <div className="relative z-10">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
          Real Estate Auctions Made Easy
        </h1>
        {/* <div className="flex flex-col items-center mt-4">
          <input
            type="text"
            placeholder="Search by City, State, Zip Code, Address or County"
            className="w-[90%] md:w-[60%] lg:w-[40%] px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
            Search
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default HomeBanner;

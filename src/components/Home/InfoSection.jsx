import React from "react";

const InfoSection = () => {
  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center px-8">
          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Home Buyers
            </h2>
            <p className="text-gray-600">
              Our website offers a wealth of information to assist each buyer.
              Our customer service team is available seven days a week to answer
              questions. Create your free account today and gain access to
              exclusive auction inventory.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center mt-6 md:mt-0">
            <img
              src="/logo.png" // Replace with your icon's path
              alt="Home Buyers Illustration"
              className="w-40 "
            />

          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-8"></div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-800">Home Investors</h3>
            <p className="text-gray-600 mt-2">
              HomeBid’s full-service platform drives operational
              efficiencies by…
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-800">
              Real Estate Brokers
            </h3>
            <p className="text-gray-600 mt-2">
              HomeBid has built long-standing, trusted relationships
              with the…
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-800">Home Buyers</h3>
            <p className="text-gray-600 mt-2">
              Our website offers a wealth of information to assist each buyer.
              The…
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-800">Home Sellers</h3>
            <p className="text-gray-600 mt-2">
              Seamlessly integrating title, valuation, asset management and
              property…
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;

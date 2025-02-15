import React from 'react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsBuilding } from 'react-icons/bs';
import parse from 'html-react-parser';

const PropertyDetails = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-md mt-8 p-16  max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Asking Price */}
        <div className="space-y-2">
          <h3 className="text-gray-500 font-medium">Asking Price</h3>
          <p className="text-teal-600 text-2xl font-bold">
            Rs. {property?.actual_price}
          </p>
        </div>

        {/* Offers Over */}
        <div className="space-y-2">
          <h3 className="text-gray-500 font-medium">Offers Over</h3>
          <p className="text-teal-600 text-2xl font-bold">
            Rs. {(property?.actual_price * 0.97)?.toLocaleString()}
          </p>
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <h3 className="text-gray-500 font-medium">Property Type</h3>
          <div className="flex items-center space-x-2">
            <BsBuilding className="text-teal-600 text-xl" />
            <p className="text-teal-600 text-2xl font-bold">Detached</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Property Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* BER Rating */}
        <div className="space-y-2">
          <h3 className="text-gray-500 font-medium">BER Rating</h3>
          <div className="flex items-center space-x-2">
            <div className="bg-green-500 text-white px-3 py-1 rounded-md font-semibold">
              C2
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div className="space-y-2">
          <h3 className="text-gray-500 font-medium">Bedrooms</h3>
          <div className="flex items-center space-x-2">
            <FaBed className="text-teal-600 text-xl" />
            <p className="text-teal-600 text-2xl font-bold">{property?.bedrooms}</p>
          </div>
        </div>

        {/* Bathrooms */}
        <div className="space-y-2">
          <h3 className="text-gray-500 font-medium">Bathrooms</h3>
          <div className="flex items-center space-x-2">
            <FaBath className="text-teal-600 text-xl" />
            <p className="text-teal-600 text-2xl font-bold">{property?.bathrooms}</p>
          </div>
        </div>
      </div>


      <p className='text-gray-800 font-bold text-xl mt-12'>Description:</p>
      <div className=" max-w-none mt-2 bg-white  rounded-lg ">
        {property.description ? parse(property.description) : ''}
      </div>
    </div>

  );
};

export default PropertyDetails;

import React from 'react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsBuilding } from 'react-icons/bs';

const PropertyDetails = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-md mt-8 p-16  max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Asking Price */}
        <div className="space-y-2">
          <h3 className="text-gray-500 font-medium">Asking Price</h3>
          <p className="text-teal-600 text-2xl font-bold">
            Rs. {property?.actual_price * 2}
          </p>
        </div>

        {/* Offers Over */}
        <div className="space-y-2">
          <h3 className="text-gray-500 font-medium">Offers Over</h3>
          <p className="text-teal-600 text-2xl font-bold">
            Rs. {(property?.actual_price * 1.5)?.toLocaleString()}
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


      <p className='text-gray-500  mt-8 '><span className='font-bold text-xl'>Description:</span> {property?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem sequi ad, nisi ex perspiciatis nemo natus, praesentium accusamus dignissimos dolorem corporis harum pariatur, velit blanditiis dolorum error adipisci. Quia sed animi corporis, distinctio nihil nobis voluptate cumque quas ratione. Ut odio recusandae expedita velit commodi enim corrupti fugit dolor sunt consequuntur, alias ab facilis autem molestiae incidunt obcaecati rerum at cum ex, similique mollitia? Nulla, itaque quis eligendi fugiat eius sint dolor, nemo ipsum minima tenetur tempore pariatur? Mollitia veniam iure veritatis saepe at perspiciatis dolore debitis! Reprehenderit, perferendis qui harum dolorum voluptatem excepturi. Autem repellat, debitis quisquam cupiditate odit aliquid natus, velit nemo at quam est ducimus blanditiis deserunt consequatur nam omnis perferendis, rerum exercitationem sunt! Minima officiis quos veritatis at quis architecto labore dolor nobis distinctio vero. Natus dignissimos tempora non eaque minus pariatur sit assumenda dolore adipisci similique, architecto soluta vitae quasi, molestiae odit. Accusamus asperiores debitis cum velit numquam amet facere nulla aspernatur voluptate alias sed tempora accusantium nisi nemo repudiandae qui tenetur fugit aliquid libero rem hic odit, similique nihil itaque? Facere praesentium optio, incidunt dolorem quisquam ab sunt cumque nihil voluptatem. Delectus quo consectetur assumenda distinctio hic perferendis, numquam expedita, sit facere temporibus quis maiores ut quidem sapiente dicta tempora tempore enim provident, animi natus at. Voluptas molestias consequatur maiores corporis sequi quia placeat.</p>
    </div>

  );
};

export default PropertyDetails;

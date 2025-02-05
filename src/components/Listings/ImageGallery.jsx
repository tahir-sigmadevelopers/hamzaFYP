import React, { useState } from "react";

const ImageGallery = ({ images }) => {

  const [mainImage, setMainImage] = useState("")

  if (!images || images.length === 0) {
    return (
      <div className="bg-white shadow rounded-md p-4">
        <img
          src="https://via.placeholder.com/600x400"
          alt="No Image Available"
          className="w-full h-80 object-cover rounded-md"
        />
        <p className="text-center text-gray-500 mt-2">No images available</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-md p-4">
      {/* Display Main Image */}
      <img
        src={mainImage || images[0]?.image} // Use the first image as the main image
        alt="Banner"
        className="w-full h-80 object-cover rounded-md"
      />

      {/* Display Thumbnails */}
      <div className="flex space-x-4 mt-4">
        {images.map((imgObj, index) => (
          <img
            onClick={() => setMainImage(imgObj.image)} // Set main image when thumbnail is clicked
            key={imgObj.id} // Use id as key
            src={imgObj.image} // Access the 'image' attribute
            alt={`Thumbnail ${index + 1}`}
            className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${mainImage === imgObj.image ? "border-blue-500" : "border-transparent"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;

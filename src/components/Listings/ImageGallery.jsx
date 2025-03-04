import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images?.[0]?.image || "");

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

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <div className="bg-white shadow rounded-md p-4">
      {/* Main Image Slider */}
      <Slider {...settings}>
        {images.map((imgObj, index) => (
          <div key={imgObj.id}>
            <img
              src={imgObj.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-80 object-contain rounded-md"
            />
          </div>
        ))}
      </Slider>

      {/* Thumbnails */}
      <div className="flex space-x-4 mt-4">
        {images.map((imgObj, index) => (
          <img
            key={imgObj.id}
            src={imgObj.image}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setMainImage(imgObj.image)}
            className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
              mainImage === imgObj.image ? "border-blue-500" : "border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;

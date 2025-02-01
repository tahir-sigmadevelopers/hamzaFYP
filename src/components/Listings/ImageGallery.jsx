const ImageGallery = () => {
    return (
      <div className="bg-white shadow rounded-md p-4">
        <img
          src="https://via.placeholder.com/600x400"
          alt="Main Property"
          className="w-full h-80 object-cover rounded-md"
        />
        <div className="flex space-x-4 mt-4">
          {[1, 2, 3, 4].map((_, index) => (
            <img
              key={index}
              src="https://via.placeholder.com/100x100"
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover rounded-md cursor-pointer"
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default ImageGallery;
  
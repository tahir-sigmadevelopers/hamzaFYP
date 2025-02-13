import { Link } from "react-router-dom";

export const server = 'https://hamzafypbackend.onrender.com/'
// export const server = 'http://localhost:8000/'  // Keep the trailing slash

const PropertyGrid = ({ properties }) => {
  // Helper function to get correct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/hamza.jpg'; // Add a placeholder image in your public folder
    
    // If the image path already includes the server URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Remove any double slashes except for http(s)://
    return `${server}${imagePath}`.replace(/([^:]\/)\/+/g, "$1");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Link 
          to={`/properties/details/${property?.id}`} 
          key={property.id} 
          className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="relative w-full h-48">
            <img
              src={getImageUrl(property?.images[0]?.image)}
              alt={property.address}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = '/placeholder-property.jpg'; // Fallback image
              }}
            />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-bold">{property.address}</h2>
            <p className="text-sm text-gray-600">{property.location}</p>
            {/* <p className="text-sm text-gray-600">{property.county}</p> */}
            <p className="text-sm text-gray-600">Bath Room: {property.bathrooms}</p>
            <p className="text-sm text-gray-600">Bed Room: {property.bedrooms}</p>
            {/* <p className="text-sm font-bold text-red-600">{property.status}</p> */}
            <p className="text-sm">Scheduled for Auction: {property.date_listed.toString()}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PropertyGrid;

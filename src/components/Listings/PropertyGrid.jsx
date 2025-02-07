import { Link } from "react-router-dom";

const properties2 = [
  {
    id: 1,
    address: "390 Warren Ct",
    location: "Vine Grove, KY - 40175",
    county: "Hardin County",
    type: "Single Family Home",
    details: "3 Bd | 2 Ba | 1,188 Sq Ft",
    status: "Foreclosure",
    auctionDate: "Jan 06, 2025",
    imageUrl: "https://via.placeholder.com/300x200",
  },

];

export const server = 'https://homebidding-backend.onrender.com/'
// export const server = 'http://127.0.0.1:8000/'
// export const server = 'http://localhost:8000/'



const PropertyGrid = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Link to={`/properties/details/${property?.id}`} key={property.id} className="bg-white shadow-md rounded-md overflow-hidden">
          <img
            src={`${server}/${property?.images[0]?.image}` }
          alt={property.address}
          className="w-full h-48 object-cover"
          />
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

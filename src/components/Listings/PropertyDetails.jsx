const PropertyDetails = ({property}) => {
    return (
      <div className="bg-white shadow rounded-md p-6 mt-6">
        <h1 className="text-2xl font-bold mb-4">
          PERIOD MANSION WITH AN ACRE OF LAND FOR SALE
        </h1>
        <p className="text-gray-700 mb-4">
          {property?.description}
        </p>
        <p className="text-gray-700">
          Owner Name: {property?.owner_name}
        </p>
      </div>
    );
  };
  
  export default PropertyDetails;
  
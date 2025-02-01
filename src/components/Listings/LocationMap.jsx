const LocationMap = () => {
    return (
      <div className="bg-white shadow rounded-md p-6">
        <h3 className="text-lg font-bold mb-4">Location</h3>
        <iframe
          src="https://maps.google.com/maps?q=54.413073,-1.124656&z=15&output=embed"
          title="Property Location"
          className="w-full h-64 rounded-md"
        ></iframe>
      </div>
    );
  };
  
  export default LocationMap;
  
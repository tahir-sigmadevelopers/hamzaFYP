const Filters = () => {
    return (
      <div className="bg-white shadow-md p-4 mb-6 flex flex-wrap items-center gap-4">
        <button className="border rounded-md px-4 py-2 hover:bg-gray-100">Program</button>
        <button className="border rounded-md px-4 py-2 hover:bg-gray-100">Occupancy</button>
        <button className="border rounded-md px-4 py-2 hover:bg-gray-100">Property Type</button>
        <button className="border rounded-md px-4 py-2 hover:bg-gray-100">Features</button>
        <button className="border rounded-md px-4 py-2 hover:bg-gray-100">More Filters</button>
        <button className="ml-auto text-blue-600">Reset All Filters</button>
      </div>
    );
  };
  
  export default Filters;
  
const BidSection = () => {
    return (
      <div className="bg-white shadow rounded-md p-6">
        <h2 className="text-lg font-bold mb-4 text-green-700">Bidding not yet open</h2>
        <p className="text-gray-700 mb-4">
          <span className="font-bold">Minimum Opening Bid:</span> £695,000
        </p>
        <div className="flex flex-col space-y-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Log in / Register to Bid
          </button>
          <p className="text-gray-500 text-sm">
            <strong>Bidding Opens:</strong> 20th Jan 2025 12:00
          </p>
          <p className="text-gray-500 text-sm">
            <strong>Scheduled End Date:</strong> 22nd Jan 2025 11:02
          </p>
        </div>
  
        <form className="mt-6 space-y-4">
          <h3 className="text-lg font-bold">Make an Enquiry</h3>
          <input
            type="text"
            placeholder="Title"
            className="border rounded-md px-4 py-2 w-full"
          />
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="First Name"
              className="border rounded-md px-4 py-2 w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border rounded-md px-4 py-2 w-full"
            />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            className="border rounded-md px-4 py-2 w-full"
          />
          <input
            type="text"
            placeholder="Telephone"
            className="border rounded-md px-4 py-2 w-full"
          />
          <textarea
            placeholder="Enquiry"
            className="border rounded-md px-4 py-2 w-full h-20"
          ></textarea>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md w-full">
            Submit
          </button>
        </form>
      </div>
    );
  };
  
  export default BidSection;
  
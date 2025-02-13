import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { server } from '../components/Listings/PropertyGrid';

const BiddingPage = () => {
  const { propertyId } = useParams();
  const [bidAmount, setBidAmount] = useState('');
  const [property, setProperty] = useState(null);
  const [bidsData, setBidsData] = useState({
    highest_bid: null,
    total_bids: 0,
    all_bids: []
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for logged in user
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const fetchData = async () => {
      try {
        // Get property details
        const propertyResponse = await axios.get(`${server}api/auth/property/${propertyId}/`);
        setProperty(propertyResponse.data);

        // Get bids for the property
        const bidsResponse = await axios.get(`${server}api/auth/property/${propertyId}/bids/`);
        setBidsData(bidsResponse.data);
      } catch (error) {
        toast.error('Error fetching data: ' + (error.response?.data?.error || error.message));
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up polling for bid updates
    const interval = setInterval(fetchData, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, [propertyId]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to place a bid');
      return;
    }

    if (!bidAmount) {
      toast.error('Please enter a bid amount');
      return;
    }

    const amount = parseFloat(bidAmount);
    const minBid = property.actual_price * 1.5;
    const currentHighestBid = bidsData.highest_bid?.amount || 0;

    if (amount < minBid) {
      toast.error(`Minimum bid must be Rs. ${minBid}`);
      return;
    }

    if (amount <= currentHighestBid) {
      toast.error('Bid must be higher than the current highest bid');
      return;
    }

    try {
      const response = await axios.post(
        `${server}api/auth/bids/`,
        {
          property: propertyId,
          amount: amount,
          email: user.email
        }
      );

      // Refresh bids after successful submission
      const bidsResponse = await axios.get(`${server}api/auth/property/${propertyId}/bids/`);
      setBidsData(bidsResponse.data);

      toast.success('Bid placed successfully!');
      setBidAmount('');
    } catch (error) {
      console.error("Error details:", error.response);
      const errorMessage = error.response?.data?.error || 'Error placing bid';
      toast.error(errorMessage);
    }
  };




  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Property Details Card */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{property?.address}</h1>
              <p className="text-gray-600 mt-2">{property?.location}</p>
              <div className="mt-4 space-y-2">
                <p className="text-gray-700">
                  <span className="font-semibold">Size:</span> {property?.size} (Sq. ft)
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Bedrooms:</span> {property?.bedrooms}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Bathrooms:</span> {property?.bathrooms}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-600">Base Price</p>
              <p className="text-2xl font-bold text-green-600">Rs. {property?.actual_price?.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Bidding Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Bid Form */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Place Your Bid</h2>
            <form onSubmit={handleBidSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Your Bid Amount (Rs.)
                </label>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your bid amount"
                  min={property?.actual_price * 97}
                  step="1000"
                  required
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-semibold mb-2">Bidding Rules:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>Minimum bid: Rs. {(property?.actual_price * 0.97)}</li>
                  <li>Must be higher than current highest bid</li>
                  <li>All bids are final</li>
                </ul>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md transition duration-200"
                disabled={!user}
              >
                {user ? 'Place Bid' : 'Login to Bid'}
              </button>
            </form>
          </div>

          {/* Bid History */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Current Status</h2>
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                <div>
                  <p className="text-gray-600">Highest Bid</p>
                  <p className="text-xl font-bold text-green-600">
                    {bidsData.highest_bid
                      ? `Rs. ${bidsData.highest_bid.amount.toLocaleString()}`
                      : 'No bids yet'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Total Bids</p>
                  <p className="text-xl font-bold text-blue-600">{bidsData.total_bids}</p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Bid History</h2>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {bidsData.all_bids?.map((bid, index) => (
                <div
                  key={bid.id || index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                >
                  <div>
                    <p className="font-medium">Rs. {bid.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(bid.created_at).toLocaleString()}
                    </p>
                  </div>
                  {index === 0 && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Highest
                    </span>
                  )}
                </div>
              ))}
              {bidsData.all_bids?.length === 0 && (
                <p className="text-gray-500 text-center py-4">No bids placed yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiddingPage; 
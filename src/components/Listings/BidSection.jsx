import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from './PropertyGrid';
import { toast } from 'react-hot-toast';

const BidSection = ({ property }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [biddingClosed, setBiddingClosed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Check bidding status
    if (property?.id) {
      checkBiddingStatus();
    }
  }, [property?.id]);

  const checkBiddingStatus = async () => {
    try {
      const response = await axios.get(`${server}api/auth/property/${property.id}/bids/`);
      setBiddingClosed(response.data.bidding_closed);
    } catch (error) {
      console.error('Error checking bid status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleBidClick = () => {
    navigate(`/property/${property.id}/bid`);
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (biddingClosed) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center">
          <div className="bg-red-100 text-red-800 px-4 py-3 rounded-md mb-4">
            <h3 className="text-xl font-semibold">Bidding is Closed</h3>
            <p className="text-sm mt-2">This property has been sold</p>
          </div>
          <Link 
            to="/properties" 
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Browse Other Properties
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Login to Place Bid</h3>
        <button 
          onClick={handleLoginRedirect}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Login to Bid
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Bid on this Property</h3>
      <button
        onClick={handleBidClick}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
      >
        Place Bid
      </button>
    </div>
  );
};

export default BidSection;





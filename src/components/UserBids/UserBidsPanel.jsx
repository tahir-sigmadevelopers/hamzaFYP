import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { server } from '../Listings/PropertyGrid';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const UserBidsPanel = () => {
  const [userBids, setUserBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      fetchUserBids();
    }
  }, [user]);

  const fetchUserBids = async () => {
    try {
      const response = await axios.get(`${server}api/auth/bids/user/${user.email}/`);
      setUserBids(response.data);
      
      // Check for any new status changes and show notifications
      response.data.forEach(bid => {
        if (bid.status === 'accepted' && !bid.notified) {
          toast.success(`Your bid for ${bid.property_address} has been accepted!`);
          markBidAsNotified(bid.id);
        } else if (bid.status === 'rejected' && !bid.notified) {
          toast.error(`Your bid for ${bid.property_address} has been rejected.`);
          markBidAsNotified(bid.id);
        }
      });
    } catch (error) {
      toast.error('Error fetching your bids');
    } finally {
      setLoading(false);
    }
  };

  const markBidAsNotified = async (bidId) => {
    try {
      await axios.post(`${server}api/auth/bids/${bidId}/mark-notified/`);
    } catch (error) {
      console.error('Error marking bid as notified:', error);
    }
  };

  const getBadgeColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Bids</h1>
        
        {userBids.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <p className="text-gray-500">You haven't placed any bids yet.</p>
            <Link to="/properties" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Bid Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {userBids.map((bid) => (
                    <tr key={bid.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold">
                          {bid.id}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link 
                          to={`/properties/details/${bid.property}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {bid.property_address}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold">
                          Rs. {bid.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500">
                          {new Date(bid.created_at).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getBadgeColor(bid.status)}`}>
                          {bid.status || 'pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBidsPanel; 
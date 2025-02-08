import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { server } from '../components/Listings/PropertyGrid';
import { Link } from 'react-router-dom';

const AllBidsPage = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBids();
    // Poll for new bids every 30 seconds
    const interval = setInterval(fetchBids, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchBids = async () => {
    try {
      const response = await axios.get(`${server}api/auth/bids/all/`);
      setBids(response.data);
    } catch (error) {
      toast.error('Error fetching bids: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptBid = async (bidId) => {
    try {
      await axios.post(`${server}api/bids/${bidId}/accept/`);
      toast.success('Bid accepted successfully');
      fetchBids();
    } catch (error) {
      toast.error('Error accepting bid: ' + error.message);
    }
  };

  const handleRejectBid = async (bidId) => {
    try {
      await axios.post(`${server}api/bids/${bidId}/reject/`);
      toast.success('Bid rejected successfully');
      fetchBids();
    } catch (error) {
      toast.error('Error rejecting bid: ' + error.message);
    }
  };

  const filteredBids = bids.filter(bid => {
    if (filter === 'all') return true;
    return bid.status === filter;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">All Property Bids</h1>
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Bids</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bid Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bidder
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBids.map((bid) => (
                  <tr key={bid.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link 
                        to={`/admin/property/${bid.property}/bids`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {bid.property_address}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-semibold text-gray-900">
                        Rs. {bid.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {bid.bidder_username || 'Anonymous'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(bid.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${bid.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                          bid.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {bid.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {!bid.status && (
                        <div className="space-x-2">
                          <button
                            onClick={() => handleAcceptBid(bid.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleRejectBid(bid.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBids.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No bids found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBidsPage; 
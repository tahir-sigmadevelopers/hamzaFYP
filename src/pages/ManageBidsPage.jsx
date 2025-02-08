import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { server } from '../components/Listings/PropertyGrid';

const ManageBidsPage = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get property details
        const propertyResponse = await axios.get(`${server}api/auth/property/${propertyId}/`);
        setProperty(propertyResponse.data);

        // Get all bids for the property
        const bidsResponse = await axios.get(`${server}api/auth/property/${propertyId}/bids/`);
        setBids(bidsResponse.data.all_bids);
      } catch (error) {
        toast.error('Error fetching data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Poll for new bids every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [propertyId]);

  const handleAcceptBid = async (bidId) => {
    try {
      await axios.post(`${server}api/auth/bids/${bidId}/accept/`);
      toast.success('Bid accepted successfully');
      
      // Refresh bids
      const bidsResponse = await axios.get(`${server}api/auth/property/${propertyId}/bids/`);
      setBids(bidsResponse.data.all_bids);
    } catch (error) {
      toast.error('Error accepting bid: ' + error.message);
    }
  };

  const handleRejectBid = async (bidId) => {
    try {
      await axios.post(`${server}api/auth/bids/${bidId}/reject/`);
      toast.success('Bid rejected successfully');
      
      // Refresh bids
      const bidsResponse = await axios.get(`${server}api/auth/property/${propertyId}/bids/`);
      setBids(bidsResponse.data.all_bids);
    } catch (error) {
      toast.error('Error rejecting bid: ' + error.message);
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
      <div className="max-w-6xl mx-auto">
        {/* Property Details Header */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{property?.address}</h1>
              <p className="text-gray-600 mt-2">{property?.location}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-600">Base Price</p>
              <p className="text-2xl font-bold text-blue-600">
                Rs. {property?.actual_price?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Bids Management Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Manage Bids</h2>
            <p className="text-gray-600">Total Bids: {bids.length}</p>
          </div>

          {/* Bids Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bid ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
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
                {bids.map((bid) => (
                  <tr key={bid.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      #{bid.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-semibold text-gray-900">
                        Rs. {bid.amount.toLocaleString()}
                      </span>
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

          {bids.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No bids have been placed yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBidsPage; 
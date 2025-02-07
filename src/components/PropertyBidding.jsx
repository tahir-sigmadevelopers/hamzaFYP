import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from './Listings/PropertyGrid';

const PropertyBidding = ({ propertyId }) => {
    const [property, setProperty] = useState(null);
    const [bidAmount, setBidAmount] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProperty();
        const interval = setInterval(fetchProperty, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, [propertyId]);

    const fetchProperty = async () => {
        try {
            const response = await axios.get(`/api/properties/${propertyId}/`);
            setProperty(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch property details');
            setLoading(false);
        }
    };

    const handleBidSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.post(`${server}/api/properties/${propertyId}/place_bid/`, {
                amount: bidAmount
            });
            setBidAmount('');
            fetchProperty();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to place bid');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!property) return <div>Property not found</div>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">{property.title}</h2>
                <div className="mb-4">
                    <p className="text-gray-600">Current Price:</p>
                    <p className="text-2xl font-bold text-green-600">
                        ${property.current_price}
                    </p>
                </div>

                {property.is_active ? (
                    <form onSubmit={handleBidSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Your Bid Amount
                            </label>
                            <input
                                type="number"
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                                min={property.current_price + 1}
                                step="0.01"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                        >
                            Place Bid
                        </button>
                    </form>
                ) : (
                    <p className="text-red-600 font-medium">Bidding is closed</p>
                )}

                {error && (
                    <div className="mt-4 text-red-600">{error}</div>
                )}

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Bid History</h3>
                    <div className="space-y-2">
                        {property?.bids?.map((bid) => (
                            <div
                                key={bid.id}
                                className="flex justify-between items-center bg-gray-50 p-2 rounded"
                            >
                                <span>{bid.bidder_name}</span>
                                <span className="font-medium">${bid.amount}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyBidding; 
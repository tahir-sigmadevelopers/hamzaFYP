import React, { useState } from 'react';
import axios from 'axios';
import { server } from './Listings/PropertyGrid';

const PricePrediction = () => {
  const [formData, setFormData] = useState({
    size: '',
    bedrooms: '',
    location: '',
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${server}api/predict-price/`, formData);
      setPrediction(response.data.predicted_price);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg my-4">
      <h2 className="text-2xl font-bold mb-6">Property Price Prediction</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Property Size (sq ft)
          </label>
          <input
            type="number"
            name="size"
            value={formData.size}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Bedrooms
          </label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <select
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select location</option>
            <option value="urban">Urban</option>
            <option value="suburban">Suburban</option>
            <option value="rural">Rural</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loading ? 'Predicting...' : 'Predict Price'}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-600">
          {error}
        </div>
      )}

      {prediction && (
        <div className="mt-6 p-4 bg-green-50 rounded-md">
          <h3 className="text-lg font-medium text-green-800">
            Predicted Price: Rs. {prediction.toLocaleString()}
          </h3>
        </div>
      )}
    </div>
  );
};

export default PricePrediction; 
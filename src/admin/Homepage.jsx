import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { HiOfficeBuilding, HiCurrencyDollar } from 'react-icons/hi';
import axios from 'axios';
import { server } from '../components/Listings/PropertyGrid';
import { toast } from 'react-hot-toast';

const Homepage = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeBids: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch properties count
      const propertiesResponse = await axios.get(`${server}properties/`);
      const totalProperties = propertiesResponse.data.length;

      // Fetch bids count
      const bidsResponse = await axios.get(`${server}api/auth/bids/all/`);
      const activeBids = bidsResponse.data.length;

      setStats({
        totalProperties,
        activeBids
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to fetch dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Total Properties"
            value={loading ? "Loading..." : stats.totalProperties}
            icon={<HiOfficeBuilding className="w-8 h-8" />}
            color="green"
          />
          <DashboardCard
            title="Active Bids"
            value={loading ? "Loading..." : stats.activeBids}
            icon={<HiCurrencyDollar className="w-8 h-8" />}
            color="blue"
          />
        </div>
      </div>
    </AdminLayout>
  );
};

const DashboardCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    green: "text-green-600",
    blue: "text-blue-600",
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 transition-transform duration-200 hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={colorClasses[color]}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
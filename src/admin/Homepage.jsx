import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import {
  HiOfficeBuilding,
  HiCurrencyDollar,
  HiXCircle,
  HiUsers,
  HiTrendingUp,
  HiClock
} from 'react-icons/hi';
import axios from 'axios';
import { server } from '../components/Listings/PropertyGrid';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeBids: 0,
    inactiveBids: 0,
    totalUsers: 0,
    averageBidAmount: 0,
    recentBids: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);

      // Fetch properties count
      const propertiesResponse = await axios.get(`${server}properties/`);
      const totalProperties = propertiesResponse.data.length;

      // Fetch bids count and calculate stats
      const bidsResponse = await axios.get(`${server}api/auth/bids/all/`);
      const allBids = bidsResponse.data;

      const activeBids = allBids.filter(bid => bid.status === 'pending').length;
      const inactiveBids = allBids.filter(bid => bid.status === 'accepted' || bid.status === 'rejected').length;

      // Calculate average bid amount
      const totalAmount = allBids.reduce((sum, bid) => sum + bid.amount, 0);
      const averageBidAmount = allBids.length > 0 ? Math.round(totalAmount / allBids.length) : 0;

      // Get recent bids (last 24 hours)
      const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const recentBids = allBids.filter(bid => new Date(bid.created_at) > last24Hours).length;

      // Fetch users count
      const usersResponse = await axios.get(`${server}api/auth/users/stats/`);
      const totalUsers = usersResponse?.data?.total_users;
      console.log(usersResponse.data);


      setStats({
        totalProperties,
        activeBids,
        inactiveBids,
        totalUsers,
        averageBidAmount,
        recentBids
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
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/admin/properties">
            <DashboardCard
              title="Total Properties"
              value={loading ? "Loading..." : stats.totalProperties}
              icon={<HiOfficeBuilding className="w-8 h-8" />}
              color="blue"
            />
          </Link>
          <Link to="/admin/property/bids">
            <DashboardCard
              title="Active Bids"
              subtitle="Pending"
              value={loading ? "Loading..." : stats.activeBids}
              icon={<HiCurrencyDollar className="w-8 h-8" />}
              color="green"
            />
          </Link>
          <Link to="/admin/property/bids">
            <DashboardCard
              title="Inactive Bids"
              subtitle="Accepted/Rejected"
              value={loading ? "Loading..." : stats.inactiveBids}
              icon={<HiXCircle className="w-8 h-8" />}
              color="red"
            />
          </Link>

          {/* New Cards */}
          <Link to="/admin/users">
            <DashboardCard
              title="Total Users"
              subtitle="Registered Users"
              value={loading ? "Loading..." : stats.totalUsers}
              icon={<HiUsers className="w-8 h-8" />}
              color="purple"
            />
          </Link>
          <DashboardCard
            title="Average Bid Amount"
            subtitle="Per Property"
            value={loading ? "Loading..." : `Rs. ${stats.averageBidAmount.toLocaleString()}`}
            icon={<HiTrendingUp className="w-8 h-8" />}
            color="yellow"
          />
          <DashboardCard
            title="Recent Bids"
            subtitle="Last 24 Hours"
            value={loading ? "Loading..." : stats.recentBids}
            icon={<HiClock className="w-8 h-8" />}
            color="indigo"
          />
        </div>
      </div>
    </AdminLayout>
  );
};

const DashboardCard = ({ title, subtitle, value, icon, color }) => {
  const colorClasses = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    red: "text-red-600 bg-red-50",
    purple: "text-purple-600 bg-purple-50",
    yellow: "text-yellow-600 bg-yellow-50",
    indigo: "text-indigo-600 bg-indigo-50"
  };

  const bgHoverClasses = {
    blue: "hover:bg-blue-100",
    green: "hover:bg-green-100",
    red: "hover:bg-red-100",
    purple: "hover:bg-purple-100",
    yellow: "hover:bg-yellow-100",
    indigo: "hover:bg-indigo-100"
  };

  return (
    <div className={`bg-white rounded-lg shadow p-6 transition-all duration-200 ${bgHoverClasses[color]} hover:shadow-lg cursor-pointer`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          {subtitle && (
            <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>
          )}
          <p className={`text-2xl font-bold mt-1 ${colorClasses[color].split(' ')[0]}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
import React from 'react';
import AdminLayout from './AdminLayout';
import { HiOfficeBuilding, HiCurrencyDollar } from 'react-icons/hi';

const Homepage = () => {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Total Properties"
            value="0"
            icon={<HiOfficeBuilding className="w-8 h-8" />}
          />
          <DashboardCard
            title="Active Bids"
            value="0"
            icon={<HiCurrencyDollar className="w-8 h-8" />}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

const DashboardCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className="text-green-600">{icon}</div>
    </div>
  </div>
);

export default Homepage;
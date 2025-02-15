import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { HiHome, HiOfficeBuilding, HiCurrencyDollar, HiUsers } from 'react-icons/hi';

// import { Assignment, CategoryRounded, Home, MonetizationOn } from '@mui/icons-material';

const Sidebar = () => {
  const location = useLocation();

  const isActiveRoute = (route) => {
    return location.pathname === route;
  };

  const menuItems = [
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      icon: <HiHome className="w-6 h-6" />
    },
    {
      path: '/admin/properties',
      name: 'Properties',
      icon: <HiOfficeBuilding className="w-6 h-6" />
    },
    {
      path: '/admin/property/bids',
      name: 'Bids',
      icon: <HiCurrencyDollar className="w-6 h-6" />
    },
    {
      path: '/admin/users',
      name: 'Users',
      icon: <HiUsers className="w-6 h-6" />
    }
  ];

  return (
    <div className="h-screen bg-white shadow-lg w-64 px-4 py-6 overflow-y-auto">
      <div className="flex items-center justify-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
              isActiveRoute(item.path)
                ? 'bg-green-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar
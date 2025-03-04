import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';  // You'll need to create this action

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);  // Get user from Redux state

  console.log(user);

  const handleLogout = () => {
    // Dispatch logout action
    dispatch(logout());
    // Clear local storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Show success message
    toast.success("Logged out successfully");
    // Redirect to home page
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <Link to={"/"}>
          <img src="/logo.png" alt="Logo" className="h-8 mr-4" />
        </Link>
        <Link to={"/"}>
          <h1 className="text-xl font-semibold">HomeBid</h1>
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <Link to="/properties" className="text-gray-700 hover:text-blue-600">
          Listings
        </Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600">
          About
        </Link>
        <Link to="/contact" className="text-gray-700 hover:text-blue-600">
          Contact
        </Link>
        {/* Show Price Prediction link only to admin users */}
        {user?.is_staff && (
          <Link to="/predict-price" className="text-gray-700 hover:text-blue-600">
            Price Prediction
          </Link>
        )}
        {user && (
          <Link
            to="/my-bids"
            className="text-gray-700 hover:text-blue-600"
          >
            My Bids
          </Link>
        )}
        <div className="flex items-center space-x-4">
          {!user ? (
            <div className="space-x-4">
              <Link to="/sign-in" className="text-blue-600 font-semibold">
                Sign In
              </Link>
              <Link to="/sign-up" className="text-blue-600 font-semibold">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                Welcome, {user?.username?.charAt(0)?.toUpperCase() + user?.username?.slice(1)}
              </span>
              {user.is_staff && (
                <Link
                  to="/admin/dashboard"
                  className="text-blue-600 font-semibold hover:text-blue-800"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

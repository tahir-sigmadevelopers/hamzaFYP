import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./Listings/SearchBar";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/logo.svg" alt="Logo" className="h-8 mr-4" />
        <h1 className="text-xl font-semibold">HomeBid</h1>
      </div>
      <div className="flex items-center space-x-6">
        <Link to="/properties" className="text-gray-700 hover:text-blue-600">
          Listings
        </Link>
        <a href="/" className="text-gray-700 hover:text-blue-600">
          Auction Calendar
        </a>
        <a href="/" className="text-gray-700 hover:text-blue-600">
          Support
        </a>
        <div>
          <Link to="/sign-in" className="text-blue-600 font-semibold">
            Sign In
          </Link>{" "}
          |{" "}
          <Link to="/sign-up" className="text-blue-600 font-semibold">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

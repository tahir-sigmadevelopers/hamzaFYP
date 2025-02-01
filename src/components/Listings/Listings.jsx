import React from "react";
import Filters from "./Filters";
import PropertyGrid from "./PropertyGrid";
import Header from "./SearchBar";

const Listings = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="p-6">
                <Filters />
                <PropertyGrid />
            </main>
        </div>
    );
};

export default Listings;

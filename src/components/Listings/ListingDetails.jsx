import React from "react";
import ImageGallery from "./ImageGallery";
import PropertyDetails from "./PropertyDetails";
import BidSection from "./BidSection";
import GuideSection from "./GuideSection";
import LocationMap from "./LocationMap";

const ListingDetails = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2">
          <ImageGallery />
          <PropertyDetails />
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          <BidSection />
          <GuideSection />
          <LocationMap />
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;

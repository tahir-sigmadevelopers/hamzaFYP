import React, { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery";
import PropertyDetails from "./PropertyDetails";
import BidSection from "./BidSection";
import GuideSection from "./GuideSection";
import LocationMap from "./LocationMap";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ListingDetails = () => {

  const [property, setProperty] = useState({})


  const params = useParams()

  const { id } = params;

  const getPropertyDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/property/edit/${id}/`);
      let data = await response.json()

      console.log(data);
      setProperty(data)

      if (!response.ok) {
        toast.error('Failed to fetch property details');
        return;
      }


    } catch (error) {
      toast.error('An error occurred', error);
    }
  }


  useEffect(() => {
    getPropertyDetails()
  }, [id])
  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2">
          <ImageGallery />
          <PropertyDetails property={property} />
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

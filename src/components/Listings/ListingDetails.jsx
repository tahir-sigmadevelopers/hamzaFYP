import React, { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery";
import PropertyDetails from "./PropertyDetails";
import BidSection from "./BidSection";
import LocationMap from "./LocationMap";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { server } from "./PropertyGrid";

const ListingDetails = () => {
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { id } = params;

  const getPropertyDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${server}api/auth/property/${id}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch property details');
      }
      
      const data = await response.json();
      setProperty(data);
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPropertyDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2">
          <ImageGallery images={property?.images} />
          <PropertyDetails property={property} />
         
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          <BidSection property={property} />
          {/* <GuideSection /> */}
          <LocationMap />
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;

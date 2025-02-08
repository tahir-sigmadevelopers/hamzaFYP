import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import PropertyGrid, { server } from "./PropertyGrid";
import Header from "./SearchBar";
import toast from "react-hot-toast";

const Listings = () => {


    const [loading, setLoading] = useState(false)
    const [properties, setProperties] = useState([])



    const getAllProperties = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${server}/properties/`);

            if (response.ok) {
                const data = await response.json();
                console.log('main data', data);
                setProperties(data)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log(error.message);
            toast.error(error.message)
        }
    }



    useEffect(() => {
        getAllProperties()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100">
            {/* <Header /> */}
            <main className="p-6">
                {/* <Filters /> */}
                <PropertyGrid properties={properties} />
            </main>
        </div>
    );
};

export default Listings;

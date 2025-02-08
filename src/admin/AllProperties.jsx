import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { Skeleton } from '../components/Loader'
import { server } from '../components/Listings/PropertyGrid'

const AllProperties = () => {


    const [loading, setLoading] = useState(false)
    const [properties, setProperties] = useState([])


    const getAllProperties = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${server}properties/`);

            if (response.ok) {
                const data = await response.json();
                setProperties(data)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log(error.message);
            toast.error(error.message)
        }
    }


    const deleteProperty = (propertyId) => {
        fetch(`${server}delete/${propertyId}/`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    toast.success('Property deleted successfully');
                    getAllProperties()
                } else {
                    console.log(response);

                    toast.error('Failed to delete property');
                }
            })
            .catch((error) => {
                console.error('Error deleting property:', error);
            });
    };

    useEffect(() => {
        getAllProperties()
    }, [])
    return (
        <div className='flex'>
            <Sidebar />

            <section className=" body-font container">
                <div className="container px-5 py-6 mx-auto">
                    <div className="flex flex-col text-center w-full mb-8">
                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2">All Properties</h1>
                        <Link to={"/admin/add-property"} className='mt-4 bg-green-800 hover:bg-green-900 text-white w-52 py-2 rounded-sm'>Add New Property</Link>
                    </div>
                    <div className=" w-full mx-auto overflow-auto">
                        <table className="table-auto w-full text-left whitespace-no-wrap border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-sm md:text-lg border-b border-gray-300">Address</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-sm md:text-lg border-b border-gray-300 rounded-tl rounded-bl">Location</th>
                                    <th className="px-1 py-3 title-font tracking-wider font-medium text-sm md:text-lg border-b border-gray-300">Bathrooms</th>
                                    <th className="px-1 py-3 title-font tracking-wider font-medium text-sm md:text-lg border-b border-gray-300">Bedrooms</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-sm md:text-lg border-b border-gray-300">Size</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-sm md:text-lg border-b border-gray-300">Predicted Price</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-sm md:text-lg border-b border-gray-300">Owner Name</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-sm md:text-lg border-b border-gray-300">Date Listed</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-sm md:text-lg border-b border-gray-300">Edit</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-sm md:text-lg border-b border-gray-300">Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    loading ? <div className='flex h-[50vh] w-full justify-center items-center ml-40'><Skeleton length={6} /></div> : <>

                                        {
                                            properties && properties.map((property) => (
                                                <tr key={property?.id}>
                                                    <td className="px-3 py-3 border-b border-gray-300">{property.address}</td>
                                                    <td className="px-4 py-3 border-b border-gray-300">{property.location}</td>
                                                    <td className="px-1 py-3 text-center border-b border-gray-300">{property.bathrooms}</td>
                                                    <td className="px-1 py-3 text-center border-b border-gray-300">{property.bedrooms}</td>
                                                    <td className="px-4 py-3 border-b border-gray-300">{property.size}</td>
                                                    <td className="px-4 py-3 border-b border-gray-300">{property.predicted_price}</td>
                                                    <td className="px-4 py-3 border-b border-gray-300">{property.owner_name}</td>
                                                    <td className="px-4 py-3 border-b border-gray-300">{property.date_listed}</td>
                                                    <td className="px-4 py-3 text-lg border-b border-gray-300">
                                                        <button className='bg-black hover:bg-gray-700 text-white w-full py-0.5 rounded-md px-3'>
                                                            <Link to={`/admin/edit-property/${property?.id}`}>Edit</Link>
                                                        </button>
                                                    </td>
                                                    <td className="px-4 py-3 text-lg border-b border-gray-300">
                                                        <button
                                                            className='bg-red-500 hover:bg-red-600 text-white w-full py-0.5 rounded-md'
                                                            onClick={() => deleteProperty(property.id)}>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </>
                                }
                            </tbody>
                        </table>

                    </div>

                </div>
            </section>

        </div>
    )
}

export default AllProperties
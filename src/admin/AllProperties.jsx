import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { server } from '../components/Listings/PropertyGrid'
import AdminLayout from './AdminLayout'

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
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const deleteProperty = async (propertyId) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                const response = await fetch(`${server}api/auth/property/delete/${propertyId}/`, {
                    method: 'DELETE',
                });
                
                if (response.ok) {
                    toast.success('Property deleted successfully');
                    getAllProperties();
                } else {
                    toast.error('Failed to delete property');
                }
            } catch (error) {
                console.error('Error deleting property:', error);
                toast.error('Error deleting property');
            }
        }
    };

    useEffect(() => {
        getAllProperties()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <AdminLayout>
            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">All Properties</h1>
                        <Link 
                            to="/admin/add-property"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-200"
                        >
                            Add New Property
                        </Link>
                    </div>

                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bathrooms</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bedrooms</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listed Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {properties.map((property) => (
                                        <tr key={property.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-semibold text-gray-900">{property.id}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-900">{property.address}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-900">{property.location}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className="text-sm text-gray-900">{property.bathrooms}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className="text-sm text-gray-900">{property.bedrooms}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-900">{property.size} sqft</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-900">{property.owner_name}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-900">
                                                    {new Date(property.date_listed).toLocaleDateString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        to={`/admin/edit-property/${property.id}`}
                                                        className="text-white bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded-md transition duration-200"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteProperty(property.id)}
                                                        className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition duration-200"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                            {properties.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    No properties found
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AllProperties
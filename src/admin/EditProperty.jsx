import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Skeleton } from '../components/Loader'
import { server } from '../components/Listings/PropertyGrid'

const EditProperty = () => {


    const [location, setLocation] = useState("")
    const [address, setAddress] = useState("")
    const [size, setSize] = useState(0)
    const [bedRooms, setBedRooms] = useState(0)
    const [bathRooms, setBathrooms] = useState(0)
    // const [predicted_price, setPredicted_price] = useState(0)
    const [actual_price, setActual_price] = useState(0)
    const [owner_name, setOwnerName] = useState("")
    const [date_listed, setDateListed] = useState(new Date(Date.now()))
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const [existingImages, setExistingImages] = useState([]);

    const navigate = useNavigate()

    const formatDate = (date) => {
        if (!(date instanceof Date) || isNaN(date)) {
            // If date is invalid, return today's date
            date = new Date();
        }
        // Format the date to 'YYYY-MM-DD'
        return date.toISOString().split('T')[0];
    };



    const handleImageUpload = (e) => {
        setImages(Array.from(e.target.files));
    };



    const editPropertySubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.set("location", location);
        data.set("address", address);
        data.set("size", size);
        data.set("bedrooms", bedRooms);
        data.set("bathrooms", bathRooms);
        data.set("actual_price", actual_price);
        data.set("owner_name", owner_name);
        data.set("date_listed", formatDate(date_listed));
        data.set("description", description);

        // Handle images
        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                data.append("images", images[i]);
            }
        }

        try {
            setLoading(true);
            const response = await fetch(`${server}api/auth/property/update/${id}/`, {
                method: 'PUT',
                body: data,
            });

            const responseData = await response.json();

            if (response.ok) {
                toast.success('Property Updated Successfully');
                navigate("/admin/properties");
            } else {
                toast.error(responseData.error || 'Failed to update property');
            }
        } catch (error) {
            setLoading(false);
            console.error('Update error:', error);
            toast.error('Failed to update property');
        } finally {
            setLoading(false);
        }
    };

    const params = useParams()

    const { id } = params;

    const getPropertyDetails = async () => {
        try {
            const response = await fetch(`${server}api/auth/property/${id}/`);
            let data = await response.json();

            if (!response.ok) {
                toast.error('Failed to fetch property details');
                return;
            }

            setLocation(data?.location);
            setAddress(data?.address);
            setOwnerName(data?.owner_name);
            setSize(data?.size);
            setBedRooms(data?.bedrooms);
            setBathrooms(data?.bathrooms);
            setDescription(data?.description);
            setActual_price(data?.actual_price);
            
            // Handle date properly
            try {
                const dateObj = data?.date_listed ? new Date(data.date_listed) : new Date();
                setDateListed(dateObj);
            } catch (error) {
                console.error('Date parsing error:', error);
                setDateListed(new Date()); // Fallback to current date
            }
            
            setExistingImages(data?.images || []);
            console.log(data?.images)

        } catch (error) {
            toast.error('An error occurred', error);
        }
    };




    useEffect(() => {
        getPropertyDetails()
    }, [id])



    return (

        <div className='flex my-16'>
            <Sidebar />

            <div className="flex min-h-full container flex-col justify-center px-6 py-4 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-4 text-center text-2xl font-bold leading-4 tracking-tight">Edit Property </h2>
                </div>

                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={editPropertySubmit} className="space-y-1" encType="multipart/form-data">
                        <div>
                            <label htmlFor="owner_name" className="block text-sm font-medium leading-6">Owner Name</label>
                            <div className="mt-1">
                                <input value={owner_name} type="text" name='owner_name' onChange={(e) => setOwnerName(e.target.value)} autoComplete="owner_name" required className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inappend ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inappend focus:ring-grey-600 sm:text-sm sm:leading-6 px-2" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="date_listed" className="block text-sm font-medium leading-6">Date Listed</label>
                            <div className="mt-1">
                                <input
                                    value={formatDate(date_listed)}
                                    type="data" name='date_listed'
                                    onChange={(e) => setDateListed(new Date(e.target.value))}
                                    disabled={true}
                                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inappend ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inappend focus:ring-grey-600 sm:text-sm sm:leading-6 px-2" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium leading-6">Location</label>
                            <div className="mt-1">
                                <input value={location} type="text" name='location' onChange={(e) => setLocation(e.target.value)} autoComplete="location" required className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inappend ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inappend focus:ring-grey-600 sm:text-sm sm:leading-6 px-2" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium leading-6">Adress</label>
                            <div className="mt-1">
                                <input value={address} type="text" name='address' onChange={(e) => setAddress(e.target.value)} autoComplete="address" required className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inappend ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inappend focus:ring-grey-600 sm:text-sm sm:leading-6 px-2" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="size" className="block text-sm font-medium leading-6">Size (sqft)</label>
                            <div className="mt-1">
                                <input value={size} type="number" name='size' onChange={(e) => setSize(e.target.value)} autoComplete="location" required className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inappend ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inappend focus:ring-grey-600 sm:text-sm sm:leading-6 px-2" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="bedrooms" className="block text-sm font-medium leading-6">Bedrooms</label>
                            <div className="mt-1">
                                <input 
                                    value={bedRooms} 
                                    type="number" 
                                    name='bedrooms' 
                                    onChange={(e) => setBedRooms(e.target.value)} 
                                    required 
                                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inappend ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inappend focus:ring-grey-600 sm:text-sm sm:leading-6 px-2" 
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="bathrooms" className="block text-sm font-medium leading-6">Bathrooms</label>
                            <div className="mt-1">
                                <input 
                                    value={bathRooms} 
                                    type="number" 
                                    name='bathrooms' 
                                    onChange={(e) => setBathrooms(e.target.value)} 
                                    required 
                                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inappend ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inappend focus:ring-grey-600 sm:text-sm sm:leading-6 px-2" 
                                />
                            </div>
                        </div>



                        {/* 
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="Predicted_price" className="block text-sm font-medium leading-6" autoComplete="Predicted_price" >Predicted Price</label>
                            </div>

                            <div className="mt-1">
                                <input value={predicted_price} onChange={(e) => setPredicted_price(e.target.value)} type="number" name='Predicted_price' autoComplete="Predicted_price" required className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inappend ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inappend focus:ring-text-gray-800sm:text-sm sm:leading-6 px-2" />
                            </div>
                        </div> */}

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="actual_price" className="block text-sm font-medium leading-6" autoComplete="actual_price" >Actual Price</label>
                            </div>

                            <div className="mt-1">
                                <input value={actual_price} onChange={(e) => setActual_price(e.target.value)} type="number" name='actual_price' autoComplete="actual_price" required className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inappend ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inappend focus:ring-text-gray-800sm:text-sm sm:leading-6 px-2" />
                            </div>
                        </div>






                        <div>
                            <label htmlFor="description" className="block text-sm font-medium leading-6">Description</label>
                            <div className="mt-2">
                                <textarea name="description" rows="4" className="w-full text-sm text-gray-900 bg-white   focus:ring-0  border p-1 border-black rounded-sm" placeholder="Write Property Description..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                            </div>
                        </div>

                        <div className='pb-2'>
                            <label htmlFor="images" className="block text-sm font-medium leading-6">Images</label>
                            
                            {/* Show existing images */}
                            {existingImages?.length > 0 && (
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    {existingImages?.map((img, index) => (
                                        <div key={index} className="relative">
                                            <img 
                                                src={`${img?.image}`} 
                                                alt={`Property ${index + 1}`} 
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            <div className="mt-1 pb-1">
                                <input
                                    name="images"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 shadow-lg p-4"
                                    type="file"
                                />
                                
                                {/* Show preview of new images */}
                                {images.length > 0 && (
                                    <div className="grid grid-cols-3 gap-4 mt-4">
                                        {Array.from(images).map((file, index) => (
                                            <div key={index} className="relative">
                                                <img 
                                                    src={URL.createObjectURL(file)} 
                                                    alt={`Preview ${index + 1}`} 
                                                    className="w-full h-32 object-cover rounded-lg"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            {
                                loading ? <Skeleton length={1} /> : <button type="submit" className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offappend-2 mt-4 bg-green-600 hover:bg-green-700">Update</button>
                            }
                        </div>
                    </form>


                </div>
            </div>
        </div>

    )
}

export default EditProperty
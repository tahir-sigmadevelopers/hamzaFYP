import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { Skeleton } from '../components/Loader'
import { server } from '../components/Listings/PropertyGrid'
import AdminLayout from './AdminLayout'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const EditProperty = () => {
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState("")
    const [address, setAddress] = useState("")
    const [size, setSize] = useState(0)
    const [bedRooms, setBedRooms] = useState(0)
    const [bathRooms, setBathrooms] = useState(0)
    const [actual_price, setActual_price] = useState(0)
    const [owner_name, setOwnerName] = useState("")
    const [date_listed, setDateListed] = useState(new Date(Date.now()))
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState("")
    const [existingImages, setExistingImages] = useState([]);

    const navigate = useNavigate()
    const params = useParams()
    const { id } = params;

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

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['blockquote', 'code-block'],
            [{ 'color': [] }, { 'background': [] }],
            ['link'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'blockquote', 'code-block',
        'color', 'background',
        'link'
    ];

    return (
        <AdminLayout>
            <div className="h-full overflow-y-auto bg-gray-50">
                <div className="max-w-4xl mx-auto p-8">
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-8">Edit Property</h2>

                        <form onSubmit={editPropertySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" encType="multipart/form-data">
                            <div>
                                <label htmlFor="owner_name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Owner Name
                                </label>
                                <input 
                                    value={owner_name} 
                                    type="text" 
                                    name='owner_name' 
                                    onChange={(e) => setOwnerName(e.target.value)} 
                                    required 
                                    className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-900 sm:text-sm" 
                                />
                            </div>

                            <div>
                                <label htmlFor="date_listed" className="block text-sm font-medium text-gray-700 mb-1">
                                    Date Listed
                                </label>
                                <input
                                    disabled
                                    value={formatDate(date_listed)}
                                    type="data" 
                                    name='date_listed'
                                    onChange={(e) => setDateListed(new Date(e.target.value))}
                                    className="block w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 shadow-sm text-gray-500 sm:text-sm cursor-not-allowed" 
                                />
                            </div>

                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                    Location
                                </label>
                                <input 
                                    value={location} 
                                    type="text" 
                                    name='location' 
                                    onChange={(e) => setLocation(e.target.value)} 
                                    required 
                                    className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-900 sm:text-sm" 
                                />
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <input 
                                    value={address} 
                                    type="text" 
                                    name='address' 
                                    onChange={(e) => setAddress(e.target.value)} 
                                    required 
                                    className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-900 sm:text-sm" 
                                />
                            </div>

                            <div>
                                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                                    Size (sq ft)
                                </label>
                                <input 
                                    value={size} 
                                    type="number" 
                                    name='size' 
                                    onChange={(e) => setSize(e.target.value)} 
                                    required 
                                    className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-900 sm:text-sm" 
                                />
                            </div>

                            <div>
                                <label htmlFor="actual_price" className="block text-sm font-medium text-gray-700 mb-1">
                                    Actual Price
                                </label>
                                <input 
                                    value={actual_price} 
                                    onChange={(e) => setActual_price(e.target.value)} 
                                    type="number" 
                                    name='actual_price' 
                                    required 
                                    className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-900 sm:text-sm" 
                                />
                            </div>

                            <div>
                                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                                    Bedrooms
                                </label>
                                <input 
                                    value={bedRooms} 
                                    type="number" 
                                    name='bedrooms' 
                                    onChange={(e) => setBedRooms(e.target.value)} 
                                    required 
                                    className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-900 sm:text-sm" 
                                />
                            </div>

                            <div>
                                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
                                    Bathrooms
                                </label>
                                <input 
                                    value={bathRooms} 
                                    type="number" 
                                    name='bathrooms' 
                                    onChange={(e) => setBathrooms(e.target.value)} 
                                    required 
                                    className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-900 sm:text-sm" 
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <div className="h-96">
                                    <ReactQuill
                                        theme="snow"
                                        value={description}
                                        onChange={setDescription}
                                        modules={modules}
                                        formats={formats}
                                        className="h-80"
                                        placeholder="Write Property Description..."
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
                                    Images
                                </label>
                                
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
                                
                                <input
                                    name="images"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="block w-full px-4 py-3 text-sm text-gray-500 
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-green-50 file:text-green-700
                                        hover:file:bg-green-100
                                        border border-gray-300 rounded-md
                                        focus:outline-none focus:ring-1 focus:ring-green-500"
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

                            <div className="md:col-span-2 mt-4">
                                {loading ? (
                                    <Skeleton length={1} />
                                ) : (
                                    <button 
                                        type="submit" 
                                        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                                    >
                                        Update Property
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default EditProperty
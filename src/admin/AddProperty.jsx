import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from '../components/Loader'
import { server } from '../components/Listings/PropertyGrid'
import AdminLayout from './AdminLayout'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddProperty = () => {
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState("")
    const [address, setAddress] = useState("")
    const [size, setSize] = useState(0)
    const [bedRooms, setBedRooms] = useState(0)
    const [bathRooms, setBathrooms] = useState(0)
    const [actual_price, setActual_price] = useState(0)
    const [owner_name, setOwnerName] = useState("")
    const [date_listed, setDateListed] = useState(new Date(Date.now()))
    const [images, setImages] = useState([""]);
    const [description, setDescription] = useState("")

    const navigate = useNavigate()

    const formatDate = (date) => {
        // Format the date to 'YYYY-MM-DD'
        return date.toISOString().split('T')[0];  // ISO format to 'YYYY-MM-DD'
    }

    const handleImageUpload = (e) => {
        // setImages((e.target.files[0])); // Store file objects directly

        setImages(Array.from(e.target.files)); // Store file objects directly
        console.log("I am image upload", e.target.files[0]);
    };

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

    const addPropertySubmit = async (e) => {
        e.preventDefault()
        setLoading(true);

        const data = new FormData();
        data.set("location", location)
        data.set("address", address)
        data.set("description", description)
        data.set("size", size)
        data.set("bedrooms", bedRooms);
        data.set("bathrooms", bathRooms);
        data.set("actual_price", actual_price);
        data.set("owner_name", owner_name);
        data.set("date_listed", formatDate(date_listed));
        console.log("main hoon date listed", date_listed);
        // data.append("images", images, images.name);

        for (let i = 0; i < images.length; i++) {
            data.append("images", images[i]);
        }

        try {
            console.log(data);
            const response = await fetch(`${server}api/auth/properties-create/`, {
                method: 'POST',
                body: data,
            });

            console.log(response);
            if (response.ok) {
                toast.success('Property Added Successfully')

                setLocation("")
                setAddress("")
                setSize("")
                setBedRooms(0)
                setBathrooms(0)
                setActual_price(0)
                setImages([])

                navigate("/admin/properties");
            } else {
                toast.error('Failed to create property');
            }
        } catch (error) {
            toast.error('An error occurred', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AdminLayout>
            <div className="h-full overflow-y-auto bg-gray-50">
                <div className="max-w-4xl mx-auto p-8">
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-8">Add Property</h2>

                        <form onSubmit={addPropertySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" encType="multipart/form-data">
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
                                    Adress
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
                                <input
                                    name="images"
                                    accept="image/*"
                                    required
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
                            </div>

                            <div className="md:col-span-2 mt-4">
                                {loading ? (
                                    <Skeleton length={1} />
                                ) : (
                                    <button 
                                        type="submit" 
                                        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                                    >
                                        Create Property
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

export default AddProperty
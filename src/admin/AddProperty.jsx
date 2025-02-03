import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Skeleton } from '../components/Loader'

const AddProperty = () => {


    const [location, setLocation] = useState("")
    const [address, setAddress] = useState("")
    const [size, setSize] = useState(0)
    const [bedRooms, setBedRooms] = useState(0)
    const [bathRooms, setBathrooms] = useState(0)
    const [predicted_price, setPredicted_price] = useState(0)
    const [actual_price, setActual_price] = useState(0)
    const [owner_name, setOwnerName] = useState("")
    const [date_listed, setDateListed] = useState(new Date(Date.now()))
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState("")

    const navigate = useNavigate()

    const formatDate = (date) => {
        // Format the date to 'YYYY-MM-DD'
        return date.toISOString().split('T')[0];  // ISO format to 'YYYY-MM-DD'
    }





    const handleImageUpload = (e) => {
        setImages(Array.from(e.target.files)); // Store file objects directly
    };



    const addPropertySubmit = async (e) => {
        e.preventDefault()


        const data = new FormData();
        data.set("location", location)
        data.set("address", address)
        data.set("description", description)
        data.set("size", size)
        data.set("bedrooms", bedRooms);
        data.set("bathrooms", bathRooms);
        data.set("predicted_price", predicted_price);
        data.set("actual_price", actual_price);
        data.set("owner_name", owner_name);
        data.set("date_listed", formatDate(date_listed));
        console.log("main hoon date listed", date_listed);

        for (let i = 0; i < images.length; i++) {
            data.append("images", images[i]);
        }

        try {
            const response = await fetch('http://localhost:8000/api/auth/properties-create/', {
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
                setPredicted_price(0)
                setImages([])

                navigate("/admin/properties");
            } else {
                toast.error('Failed to create property');
            }
        } catch (error) {
            toast.error('An error occurred', error);
        }


    }






    return (

        <div className='flex my-16'>
            <Sidebar />

            <div className="flex min-h-full container flex-col justify-center px-6 py-4 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-4 text-center text-2xl font-bold leading-4 tracking-tight">Add Property </h2>
                </div>

                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={addPropertySubmit} className="space-y-1" encType="multipart/form-data">
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
                            <label htmlFor="size" className="block text-sm font-medium leading-6">Size</label>
                            <div className="mt-1">
                                <input value={size} type="number" name='size' onChange={(e) => setSize(e.target.value)} autoComplete="location" required className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inappend ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inappend focus:ring-grey-600 sm:text-sm sm:leading-6 px-2" />
                            </div>
                        </div>




                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="Predicted_price" className="block text-sm font-medium leading-6" autoComplete="Predicted_price" >Predicted Price</label>
                            </div>

                            <div className="mt-1">
                                <input value={predicted_price} onChange={(e) => setPredicted_price(e.target.value)} type="number" name='Predicted_price' autoComplete="Predicted_price" required className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inappend ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inappend focus:ring-text-gray-800sm:text-sm sm:leading-6 px-2" />
                            </div>
                        </div>

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
                                <textarea name="description"  rows="4" className="w-full text-sm text-gray-900 bg-white   focus:ring-0  border p-1 border-black rounded-sm" placeholder="Write Property Description..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                            </div>
                        </div>

                        <div className='pb-2'>
                            <label htmlFor="images" className="block text-sm font-medium leading-6">images</label>
                            <div className="mt-1 pb-1">


                                <input
                                    name="images"
                                    accept="images/*"
                                    required
                                    multiple
                                    onChange={handleImageUpload}

                                    className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 shadow-lg p-4"
                                    type="file"

                                />
                                <div className="flex h-20 w-10 gap-4 mt-5  overflow-hidden">
                                    {images && images.map((image, index) => (
                                        <img key={index} src={image} alt={`Preview ${index + 1}`} className='w-10 h-10' />
                                    ))}
                                </div>


                            </div>
                        </div>

                        <div>
                            {
                                !"createLoading" ? <Skeleton length={1} /> : <button type="submit" className="flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offappend-2  mt-4">Create</button>
                            }
                        </div>
                    </form>


                </div>
            </div>
        </div>

    )
}

export default AddProperty
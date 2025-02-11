import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Signup = () => {

    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const dispatch = useDispatch();
    const { isLoading, isError, errorMessage } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        console.log(formData);

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await dispatch(signup(formData)).unwrap();  // 👈 Use unwrap() to get the response
            
            if (response) {
                toast.success(`Sign Up Successfully! Welcome ${response?.user?.username}`);
                console.log("Response Data:", response); // Logs the entire response
                navigate("/");
            }
        } catch (error) {
            console.error("Signup failed:", error);
            toast.error("Signup failed. Please try again.");
        }
    };
    
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center  justify-center px-6 py-8 mx-auto md:h-full lg:py-0 -z-10">

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your name
                                    </label>
                                    <input

                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="John Doe"
                                        required

                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"

                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="confirm-password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirm-password"
                                        id="confirm-password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    {isLoading ? 'Signing up...' : 'Signup'}
                                </button>
                                {isError && (
                                    <div style={{ color: 'red' }}>
                                        <p>{errorMessage}</p>
                                        <button onClick={() => dispatch(resetError())}>Clear Error</button>
                                    </div>
                                )}
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?{" "}
                                    <Link
                                        to="/sign-in"
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default Signup
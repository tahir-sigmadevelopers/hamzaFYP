import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const Signup = () => {

    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();
    const { isLoading, isError, errorMessage } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        if (e.target.name === 'username') {
            // Allow spaces and proper capitalization for names
            setFormData({ 
                ...formData, 
                [e.target.name]: e.target.value.replace(/[^a-zA-Z\s]/g, '') // Only allow letters and spaces
            });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate username
        if (formData.username.trim().length < 2) {
            toast.error('Name must be at least 2 characters long');
            return;
        }

        // Validate password match
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        
        try {
            const response = await dispatch(signup(formData)).unwrap();
            
            if (response) {
                toast.success(`Sign Up Successfully! Welcome ${response?.user?.username}`);
                localStorage.setItem("user", JSON.stringify(response?.user));
                navigate("/");
            }
        } catch (error) {
            console.error("Signup failed:", error);
            toast.error(error.message || "Signup failed. Please try again.");
        }
    };
    
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 py-4">
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
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="John Doe"
                                        required
                                        minLength={2}
                                        pattern="[A-Za-z\s]+"
                                        title="Please enter a valid name (letters and spaces only)"
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
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                                            onClick={() => togglePasswordVisibility('password')}
                                        >
                                            {showPassword ? (
                                                <HiEyeOff className="w-5 h-5" />
                                            ) : (
                                                <HiEye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="confirm-password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                                            onClick={() => togglePasswordVisibility('confirm')}
                                        >
                                            {showConfirmPassword ? (
                                                <HiEyeOff className="w-5 h-5" />
                                            ) : (
                                                <HiEye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 hover:bg-green-700"
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
import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
    const teamMembers = [
        {
            name: "Hamza Bhutta",
            role: "Founder & CEO",
            image: "/team/hamza.jpg", // Add your image path
            description: "Leading the vision of HomeBid with over 5 years of real estate experience.",
            linkedin: "https://linkedin.com/in/hamzabhutta",
            email: "hamzabhutta545@gmail.com"
        },
        {
            name: "Rehman Ahmed",
            role: "Head of Operations",
            image: "/team/rehman.jpg", // Add your image path
            description: "Managing day-to-day operations and ensuring smooth property transactions.",
            linkedin: "https://linkedin.com/in/rehman-ahmed",
            email: "rehmanahmed123@gmail.com"
        },
        {
            name: "Muhammad Tahir",
            role: "Chief Technology Officer",
            image: "/team/tahir.jpg", // Add your image path
            description: "Driving technological innovation in property bidding systems.",
            linkedin: "https://linkedin.com/in/muhammadtahir",
            email: "tahirsultanofficial@gmail.com"
        }
    ];

    return (
        <>
            <div className="w-full lg:h-screen h-full m-auto flex items-center justify-cetner py-20 bg-gray-50 dark:bg-gray-900">
                <div className="w-full h-full flex flex-col justify-center items-center sm:px-4 px-2">
                    <div className="lg:w-[90%] w-full mx-auto flex flex-col lg:gap-6 lg:flex-row items-center justify-center ">
                        <div className="relative">
                            <img className="absolute z-20 lg:left-[2rem] -top-4 left-[1rem] lg:w-[8rem] lg:h-[8rem] sm:w-[6rem] sm:h-[6rem] w-[3rem] h-[3rem] rounded-full" src="https://images.unsplash.com/photo-1496483648148-47c686dc86a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHxmbG93ZXJ8ZW58MHwwfHx8MTcyMDk0OTQ2MHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Side Image" />

                            <img className="absolute z-20 lg:top-[12rem] sm:top-[11rem] top-[5rem] sm:-left-[3rem] -left-[2rem] lg:w-[8rem] lg:h-[8rem] sm:w-[6rem] sm:h-[6rem] w-[3rem] h-[3rem] rounded-full" src="https://images.unsplash.com/photo-1558281033-19cead6981dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMHx8Zmxvd2VyfGVufDB8MHx8fDE3MjA5NDk0NjB8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Side Image 2" />

                            <img className="absolute z-20 lg:top-[23rem] sm:top-[20.5rem] top-[10.5rem] left-[2rem] lg:w-[8rem] lg:h-[8rem] sm:w-[6rem] sm:h-[6rem] w-[3rem] h-[3rem] rounded-full" src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmbG93ZXJ8ZW58MHwwfHx8MTcyMDk0OTQ2MHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Side Image 3" />

                            <img
                                className="rounded-full relative object-cover right-0 lg:w-[30rem] lg:h-[30rem] sm:w-[25rem] sm:h-[25rem] w-[12rem] h-[12rem] outline sm:outline-offset-[.77em] outline-offset-[.37em] outline-green-500"
                                src="/logo.png" alt="About us" />
                        </div>
                        <div
                            className="lg:w-[60%] p-4 w-full h-full shadow-xl shadow-green-300/40 flex flex-col justify-center items-center sm:px-6 px-4 rounded-xl">
                            <h2 className="text-4xl text-center text-green-600 dark:text-green-400 font-bold px-4 py-1 md:mt-0 mt-10">
                                About Us
                            </h2>
                            <p className="md:text-3xl text-2xl text-center text-gray-800 dark:text-gray-200 font-bold my-5">We are
                                HomeBid
                            </p>
                            <p className="md:text-xl sm:text-lg text-base mt-2 text-justify sm:px-2 dark:text-gray-300">Welcome to HomeBid: Predictive Prices and Bidding for Real Estate, a trusted platform for real estate price prediction and bidding. We use AI-driven analytics to provide accurate property valuations, ensuring fair and transparent transactions for buyers and sellers.</p>

                           <div className="md:text-xl sm:text-lg text-base mt-2 text-justify sm:px-2 dark:text-gray-300">
                           <h3 className='font-bold my-4'>What We Offer:</h3>
                            <ul className='py-4'>
                                <li className='py-1'>✅AI-Powered Price Prediction for smarter investment decisions</li>
                                <li className='py-1'>✅Real Estate Bidding System for competitive property deals</li>
                                <li className='py-1'>✅Buy & Sell Properties with ease and confidence</li>
                                <li className='py-1'>✅Market Insights & Analysis to stay ahead in real estate</li>
                                <li className='text-lg'>✅Secure & Transparent Transactions for a hassle-free experience</li>
                            </ul>

                            <p>Join HomeBid today and make real estate buying, selling, and bidding simpler, smarter, and more profitable!</p>

                           </div>
                            <Link to={"/contact"} className="lg:mt-10 mt-6 lg:px-6 px-4 lg:py-3 py-2 bg-green-600 rounded-lg lg:text-xl text-lg text-white font-semibold">Contact Now</Link>

                        </div>

                    </div>
                </div>
            </div>

            <div className="py-48 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            The dedicated people behind HomeBid
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="text-center">
                                <div className="relative mb-8 inline-block">
                                    {/* Circle background with gradient border */}
                                    <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-green-400 to-blue-500 p-1">
                                        <div className="w-full h-full rounded-full overflow-hidden">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/200x200.png?text=Team+Member";
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Decorative circles */}
                                    <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-green-400"></div>
                                    <div className="absolute bottom-0 -left-2 w-6 h-6 rounded-full bg-blue-500"></div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                        {member.name}
                                    </h3>
                                    <p className="text-green-600 dark:text-green-400 font-medium">
                                        {member.role}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm px-4">
                                        {member.description}
                                    </p>
                                    <div className="flex justify-center space-x-4 pt-3">
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 transition-colors"
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                        </a>
                                        <a
                                            href={`mailto:${member.email}`}
                                            className="text-gray-600 hover:text-gray-800 transition-colors"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
import React from 'react'
import { Link } from 'react-router-dom'
const Checkoutsuccess = () => {
    return (
        <div className="bg-gray-100 h-screen">
            <div className="bg-white p-6 md:mx-auto">
                <svg
                    viewBox="0 0 24 24"
                    className="text-green-600 w-16 h-16 mx-auto my-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                >
                    <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.59L5.41 12l1.42-1.41L10 13.17l6.59-6.59 1.41 1.42L10 16.59z"
                    />
                </svg>

                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        Payment Done!
                    </h3>
                    <p className="text-gray-600 my-2">
                        Thank you for completing your secure online payment.
                    </p>
                    <p> Have a great day! </p>
                    <div className="py-10 text-center">
                        <Link
                            to="/home"
                            className="px-12 bg-buttonBgColor text-white font-semibold py-3"
                        >
                            Go Back To Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkoutsuccess
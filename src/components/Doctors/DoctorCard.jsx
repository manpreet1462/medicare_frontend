import React, { useEffect } from 'react';
import starIcon from '../../assets/images/Star.png';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

const DoctorCard = ({ doctor }) => {
    const { name, avgRating, totalRating, photo, specialization, experiences } = doctor;
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className='ml-[-200px] w-[300px] p-4 lg:p-6 shadow-lg rounded-lg bg-white'>
            {/* Doctor Image */}
            <div className="w-full">
                <img
                    src={photo}
                    alt={name}
                    className="w-full h-48 object-cover rounded-lg"
                />
            </div>

            {/* Doctor Name */}
            <h2 className='text-lg lg:text-xl text-headingColor font-bold mt-4'>
                {name}
            </h2>

            {/* Specialization & Rating */}
            <div className='mt-3 flex items-center justify-between'>
                <span className='bg-cyan-100 text-irisBlueColor py-1.5 px-4 text-sm font-semibold rounded-md'>
                    {specialization}
                </span>
                <div className='flex items-center gap-2'>
                    <span className='flex items-center gap-1 text-sm font-semibold text-headingColor'>
                        <img src={starIcon} alt="rating" className="w-4 h-4" />
                        {avgRating}
                    </span>
                    <span className='text-sm text-gray-500'>({totalRating})</span>
                </div>
            </div>

            {/* Patients & Hospital Info */}
            <div className='mt-5 flex items-center justify-between'>
                <div>
                    {/* <h3 className='text-base lg:text-lg font-semibold text-headingColor'>
                        +{totalPatients} patients
                    </h3> */}
                    <p className='text-sm text-gray-500'>at {experiences && experiences[0]?.hospital}</p>
                </div>

                {/* Arrow Button */}
                <Link
                    to={`/doctors/${doctor._id}`}
                    className="w-11 h-11 rounded-full border border-gray-800 flex items-center justify-center transition-all duration-300 hover:bg-primaryColor hover:border-primaryColor"
                >
                    <BsArrowRight className="w-5 h-5 text-gray-800 hover:text-white" />
                </Link>
            </div>
        </div >
    );
};

export default DoctorCard;

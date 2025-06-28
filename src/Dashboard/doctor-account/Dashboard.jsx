import React, { useState } from 'react';
import Loader from '../../components/Loader/Loading.jsx';
import Error from '../../components/Error/Error.jsx';
import useGetProfile from '../../hooks/useFetchData.jsx';
import { BASE_URL } from '../../config.js';
import Tabs from './Tabs.jsx';
import starIcon from '../../assets/images/Star.png'
import DoctorAbout from './../../pages/Doctors/DoctorAbout.jsx'
import Profile from './Profile.jsx';
import Appointments from './Appointments.jsx';


const Dashboard = () => {
    const { data, loading, error } = useGetProfile(`${BASE_URL}/doctors/profile/me`);
    const [tab, setTab] = useState('overview');

    return (
        <section>
            <div className="max-w-[1170px] px-5 mx-auto">
                {loading && <Loader />}
                {error && <Error />}

                {!loading && !error && (
                    <div className='grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]'>
                        <Tabs tab={tab} setTab={setTab} />

                        <div className="lg:col-span-2">
                            {data.isApproved == 'pending' && (
                                <div className="flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg">
                                    <svg
                                        aria-hidden="true"
                                        className="flex-shrink-0 w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.716 
                                            11.946c.773 1.376-.217 3.055-1.742 3.055H3.283c-1.525 
                                            0-2.515-1.679-1.742-3.055l6.716-11.946zM11 15a1 1 0 11-2 
                                            0 1 1 0 012 0zm-1-9a1 1 0 00-.993.883L9 7v4a1 1 0 
                                            001.993.117L11 11V7a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div className="ml-3 text-sm font-medium">
                                        To get approved, please complete your profile. We'll review manually and approve within 3 days.
                                    </div>
                                </div>

                            )}
                            <div className='mt-8'>
                                {tab === 'overview' &&
                                    <div>
                                        <div className='flex items-center gap-4 mb-10'>
                                            <figure className='max-w-[200px] max-h-[200px]'>
                                                <img src={data?.photo} alt="" className='w-full' />
                                            </figure>
                                            <div><span
                                                className='bg-[#CCF0F3] text-irisBlueColor py-1 px-4 
                                                lg:py-2 lg:px-6 rounded 
                                                text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold'>
                                                {data.specialization}</span>
                                                <h3 className='text-[22px] leading-9 font-bold 
                                                text-headingColor mt-3'>{data.name}</h3>
                                                <div className='flex items-center gap-[6px]'>
                                                    <span className='flex items-center gap-[6px] 
                                                    text-headingColor text-[14px] leading-5 lg:text-[16px] 
                                                    lg:leading-6 font-semibold'><img src={starIcon} alt="" />{data.averageRating}
                                                    </span>
                                                    <span className='text-textColor text-[14px] 
                                                    leading-5 lg:text-[16px] lg:leading-6 font-semibold'>({data.totalRating})
                                                    </span>
                                                </div>
                                                <p className='text__para font-[15px] lg:max-w-[390px] leading-6'>{data?.bio}</p>
                                            </div>
                                        </div>
                                        <DoctorAbout name={data.name}
                                            about={data.about}
                                            qualifications={data.qualifications}
                                            experiences={data.experiences} />
                                    </div>}
                                {tab === 'appointments' && <Appointments appointments={data.appointments} />}
                                {tab === 'settings' && <Profile doctorData={data} />}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
};

export default Dashboard;

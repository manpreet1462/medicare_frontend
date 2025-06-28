import React from 'react'
import DoctorCard from './DoctorCard.jsx'
import { BASE_URL } from '../../config.js'
import useFetchData from '../../hooks/useFetchData.jsx'
import Loader from '../../components/Loader/Loading.jsx'
import Error from '../../components/Error/Error.jsx'

const DoctorList = () => {
    const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`)
    return (
        <>
            {loading && <Loader />}
            {error && <Error />}

            {!loading && !error && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 lg:mt-14'>
                {doctors.map((doctor) => (
                    <DoctorCard key={doctor._id} doctor={doctor} />
                ))}
            </div>}
        </>
    )
}

export default DoctorList
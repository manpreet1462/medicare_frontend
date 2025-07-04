import React from 'react'
import useFetchData from '../../hooks/useFetchData.jsx'
import DoctorCard from './../../components/Doctors/DoctorCard.jsx'
import Loading from '../../components/Loader/Loading.jsx'
import Error from '../../components/Error/Error.jsx'
import { BASE_URL } from '../../config'
const MyBookings = () => {
    const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

    return (
        <div>
            {loading && !error && <Loading />}
            {error && !loading && <Error errMessage={error} />}
            {!loading && !error &&
                <div className='ml-[200px] mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    {
                        appointments.map(doctor => (<DoctorCard doctor={doctor} key={doctor._id} />))}
                </div>}
            {!loading && !error && appointments.length === 0 &&
                <h2 className='mt-5  text-center leading-7 text-[20px] font-semibold text-primaryColor'>
                    you did not book any doctor yet!
                </h2>}
        </div>
    )
}

export default MyBookings
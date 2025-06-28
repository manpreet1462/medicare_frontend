import React from 'react'
import Home from '../pages/Home'
import Services from '../pages/Services'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Contact from '../pages/Contact'
import Doctors from '../pages/Doctors/Doctors'
import DoctorDetails from '../pages/Doctors/DoctorDetails'
import MyAccount from '../Dashboard/user-account/MyAccount'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../Dashboard/doctor-account/Dashboard'
import ProtectedRoute from './ProtectedRoute'
import Checkoutsuccess from '../pages/CheckoutSuccess.jsx'
const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/doctors' element={<Doctors />} />
            <Route path='/services' element={<Services />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Signup />} />
            <Route path='/doctors/:id' element={<DoctorDetails />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/checkout-success' element={<Checkoutsuccess />} />
            <Route path='/users/profile/me' element={<ProtectedRoute allowedRoles={['patient']}><MyAccount /></ProtectedRoute>} />
            < Route path='/doctors/profile/me' element={<ProtectedRoute allowedRoles={['doctor']}><Dashboard /></ProtectedRoute>} />

        </Routes >
    )
}

export default Routers
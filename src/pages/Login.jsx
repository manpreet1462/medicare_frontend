import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';
import { authContext } from '../context/AuthContext.jsx';
import HashLoader from 'react-spinners/HashLoader.js';
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { dispatch } = useContext(authContext)
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const submitHandler = async event => {

        event.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const result = await res.json()
            if (!res.ok) {
                throw new Error(result.message);
            }
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    user: result.data,
                    token: result.token,
                    role: result.role,
                }
            });
            console.log(result, "login data");

            setLoading(false);
            toast.success(result.message);
            navigate('/home');
        } catch (err) {
            toast.error(err.message);
            setLoading(false);
        }

    }
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    return (
        <section className='ml-[200px] px-5 lg:px-0 flex flex-col md:flex-row items-center justify-center min-h-screen gap-8'>
            {/* Spline Viewer with adjusted size */}


            <div className="w-full md:w-1/2 max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
                <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
                    Hello! <span className='text-primaryColor'>Welcome</span> Back🥳
                </h3>

                <form className='py-4 md:py-0' action="" onSubmit={submitHandler}>
                    <div className='mb-5'>
                        <input
                            type="email"
                            placeholder='Enter your email'
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            className='w-full py-3 border-b border-solid border-[#0066ff61]
                            focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                            placeholder:text-textColor cursor-pointer'
                            required
                        />
                    </div>
                    <div className='mb-5'>
                        <input
                            className='w-full py-3 border-b border-solid border-[#0066ff61]
                            focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                            placeholder:text-textColor cursor-pointer'
                            type="password"
                            placeholder='Password'
                            name='password'
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mt-7">
                        <button type='submit' className='w-full bg-primaryColor text-white text-[18px] 
                        leading-[30px] rounded-lg px-4 py-3 hover:text-blue-800'>
                            {loading ? <HashLoader size={25} color='#fff' /> : 'Login'}
                        </button>
                    </div>
                    <p className='mt-5 text-textColor text-center'>
                        Don't have an account? <Link to={'/register'} className='text-primaryColor
                        font-medium ml-1 hover:text-blue-900'>Register</Link>
                    </p>
                </form>
            </div>
            <div className="max-w-lg top-8 h-[350px] md:w-1/2">
                <Spline scene="https://prod.spline.design/qOTlsiFOhu9DXuHd/scene.splinecode" />
            </div>
        </section>
    );
}

export default Login;

import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import uploadImageToCloudinary from './../../utils/uploadCloudinary.js'
import { BASE_URL, token } from '../../config.js'
import { toast } from 'react-toastify'

const Profile = ({ doctorData }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        bio: '',
        gender: '',
        specialization: '',
        ticketPrice: 0,
        qualifications: [],
        experiences: [],
        timeSlots: [],
        about: '',
        photo: null
    });


    useEffect(() => {
        setFormData({
            name: doctorData?.name,
            email: doctorData?.email,
            phone: doctorData?.phone,
            bio: doctorData?.bio,
            gender: doctorData?.gender,
            specialization: doctorData?.specialization,
            ticketPrice: doctorData?.ticketPrice,
            qualifications: doctorData?.qualifications,
            experiences: doctorData?.experiences,
            timeSlots: doctorData?.timeSlots,
            about: doctorData?.about,
            photo: doctorData?.photo,
        })
    }, [doctorData])
    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleFileInputChange = async event => {
        const file = event.target.files[0];
        const data = await uploadImageToCloudinary(file);
        setFormData({ ...formData, photo: data?.url })

    }
    const updateProfileHandler = async e => {
        e.preventDefault();

        // Avoid sending an empty password
        const updatedData = { ...formData };
        if (!updatedData.password) {
            delete updatedData.password;
        }

        try {
            const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });
            const result = await res.json();

            if (!res.ok) {
                throw Error(result.message);
            }

            toast.success(result.message);
        } catch (err) {
            toast.error(err.message);
        }
    };



    //reusable function for adding item
    const addItem = (key, item) => {
        setFormData(prevFormData => ({ ...prevFormData, [key]: [...prevFormData[key], item] }))
    }

    //reusable function for deleting item
    const deleteItem = (key, index) => {
        setFormData(prevFormData => ({ ...prevFormData, [key]: prevFormData[key].filter((_, i) => i !== index) }));
    }
    //reuasble input change function
    const handleReusableInputChangeFunc = (key, index, event) => {
        const { name, value } = event.target
        setFormData(prevFormData => {
            const updateItems = [...prevFormData[key]];
            updateItems[index][name] = value;
            return {
                ...prevFormData,
                [key]: updateItems,
            }
        })
    }



    const addQualification = (e) => {
        e.preventDefault(); // Prevent form submission
        addItem('qualifications', {
            startingDate: '', endingDate: '', degree: 'PHD', university: 'Dhaka Medical College'
        });
    };
    const handleQualificationChange = (event, index) => {
        handleReusableInputChangeFunc('qualifications', index, event)
    }
    const deleteQualification = (e, index) => {
        e.preventDefault();
        deleteItem('qualifications', index)
    }





    const addExperience = (e) => {
        e.preventDefault(); // Prevent form submission
        addItem('experiences', { startingDate: '', endingDate: '', position: 'Senior Surgeon', hospital: 'Dhaka Medical' });
    };
    const handleExperienceChange = (event, index) => {
        handleReusableInputChangeFunc('experiences', index, event)
    }
    const deleteExperience = (e, index) => {
        e.preventDefault();
        deleteItem('experiences', index)
    }





    const addTimeSlot = (e) => {
        e.preventDefault(); // Prevent form submission
        addItem('timeSlots', { day: 'Sunday', startingTime: '10:00', endingTime: '04:30' });
    };
    const handleTimeSlotChange = (event, index) => {
        handleReusableInputChangeFunc('timeSlots', index, event)
    }
    const deleteTimeSlot = (e, index) => {
        e.preventDefault();
        deleteItem('timeSlots', index)
    }

    return (
        <div>
            <h2 className='text-headingColor font-bold text-[24px] leading-9 mb-10'>Profile Information</h2>
            <form>
                <div className="mb-5">
                    <p className='form__label'>
                        Name*
                    </p>
                    <input type="text" name='name' value={formData.name}
                        onChange={handleInputChange} placeholder='Full name' className='form__input' />
                </div>
                <div className="mb-5">
                    <p className='form__label'>
                        Email*
                    </p>
                    <input type="email" name='email' value={formData.email}
                        onChange={handleInputChange} placeholder='Email' className='form__input' readOnly aria-readonly />
                </div>
                <div className="mb-5">
                    <p className='form__label'>
                        Phone*
                    </p>
                    <input type="number" name='phone' value={formData.phone}
                        onChange={handleInputChange} placeholder='Phone number' className='form__input' />
                </div>
                <div className="mb-5">
                    <p className='form__label'>
                        Bio*
                    </p>
                    <input type="text" name='bio' value={formData.bio}
                        onChange={handleInputChange} placeholder='Bio' className='form__input' maxLength={100} />
                </div>
                <div className="mb-5 grid grid-cols-3 gap-5">
                    <div>
                        <p className='form__label'>Gender*</p>
                        <select name="gender" value={formData.gender} onChange={handleInputChange} className='form__input py-3.5'>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <p className='form__label'>Specialization*</p>
                        <select name="specialization" value={formData.specialization} onChange={handleInputChange} className='form__input py-3.5'>
                            <option value="">Select</option>
                            <option value="surgeon">Surgeon</option>
                            <option value="neurologist">Neurologist</option>
                            <option value="dermatologist">Dermatologist</option>
                        </select>
                    </div>
                    <div>
                        <p className='form__label'>Ticket Price*</p>
                        <input type="text" placeholder='100' name='ticketPrice'
                            value={formData.ticketPrice} className='form__input' onChange={handleInputChange} />
                    </div>
                </div>
                <div className='mb-5'>
                    <p className='form__label'>Qualifications*</p>
                    {formData.qualifications?.map((item, index) => (
                        <div key={index} className='grid grid-cols-2 gap-5 mt-5'>
                            <div>
                                <p className="form__label">Starting Date*</p>
                                <input
                                    type="date"
                                    name={`startingDate`}
                                    value={item.startingDate}
                                    className='form__input'
                                    onChange={e => handleQualificationChange(e, index)}
                                />
                            </div>
                            <div>
                                <p className="form__label">Ending Date*</p>
                                <input
                                    type="date"
                                    name={`endingDate`}
                                    value={item.endingDate}
                                    className='form__input'
                                    onChange={e => handleQualificationChange(e, index)}
                                />
                            </div>
                            <div>
                                <p className="form__label">Degree*</p>
                                <input
                                    type="text"
                                    name={`degree`}
                                    value={item.degree}
                                    className='form__input'
                                    onChange={e => handleQualificationChange(e, index)}
                                />
                            </div>
                            <div>
                                <p className="form__label">University*</p>
                                <input
                                    type="text"
                                    name={`university`}
                                    value={item.university}
                                    className='form__input'
                                    onChange={e => handleQualificationChange(e, index)}

                                />
                            </div>
                            <button onClick={e => deleteQualification(e, index)} className='bg-red-600 p-2 text-center rounded-full text-white text-[18px] 
                            mt-[-15px] mb-[10px] cursor-pointer w-9'>
                                <AiOutlineDelete />
                            </button>
                        </div>
                    ))}
                    <button type='button' onClick={addQualification} className='bg-[#000]  py-2 px-5 rounded text-white h-fit cursor-pointer'>Add Qualifications</button>
                </div>
                <div className="mb-5">
                    <p className="form__label">Experiences*</p>
                    {formData.experiences?.map((item, index) => (
                        <div key={index} className="mb-5 p-3">
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <p className="form__label">Starting Date*</p>
                                    <input
                                        type="date"
                                        name={`startingDate`}
                                        value={item.startingDate}
                                        className="form__input"
                                        onChange={e => handleExperienceChange(e, index)}
                                    />
                                </div>

                                <div>
                                    <p className="form__label">Ending Date*</p>
                                    <input
                                        type="date"
                                        name={`endingDate`}
                                        value={item.endingDate}
                                        className="form__input"
                                        onChange={e => handleExperienceChange(e, index)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <div>
                                    <p className="form__label">Position*</p>
                                    <input
                                        type="text"
                                        name="position"
                                        value={item.position}
                                        className="form__input"
                                        onChange={e => handleExperienceChange(e, index)}

                                    />
                                </div>
                                <div>
                                    <p className="form__label">Hospital*</p>
                                    <input
                                        type="text"
                                        name="hospital"
                                        value={item.hospital}
                                        className="form__input"
                                        onChange={e => handleExperienceChange(e, index)}

                                    />
                                </div>
                            </div>

                            <button onClick={e => deleteExperience(e, index)}
                                className="text-white text-[18px] mt-2 bg-red-600 p-2 rounded-full cursor-pointer"
                            >
                                <AiOutlineDelete />
                            </button>
                        </div>
                    ))}

                    <button onClick={addExperience} className="bg-black text-white py-2 px-5 rounded mt-5 block">
                        Add Experience
                    </button>
                </div>
                <div className="mb-5">
                    <p className="form__label">Time Slots*</p>
                    {formData.timeSlots?.map((item, index) => (
                        <div key={index} className=" p-3">
                            <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                                <div>
                                    <p className="form__label">Day*</p>
                                    <select name="day" value={item.day} className='form__input py-3.5'
                                        onChange={e => handleTimeSlotChange(e, index)}>
                                        <option value="">Select</option>
                                        <option value="saturday">Saturday</option>
                                        <option value="sunday">Sunday</option>
                                        <option value="monday">Monday</option>
                                        <option value="tuesday">Tuesday</option>
                                        <option value="wednesday">Wednesday</option>
                                        <option value="thursday">Thursday</option>
                                        <option value="friday">Friday</option>

                                    </select>
                                </div>

                                <div>
                                    <p className="form__label">Starting Time*</p>
                                    <input
                                        type="time"
                                        name={'startingTime'}
                                        value={item.startingTime}
                                        className="form__input"
                                        onChange={e => handleTimeSlotChange(e, index)}

                                    />
                                </div>
                                <div>
                                    <p className="form__label">Ending Time*</p>
                                    <input
                                        type="time"
                                        name={'endingTime'}
                                        value={item.endingTime}
                                        className="form__input"
                                        onChange={e => handleTimeSlotChange(e, index)}

                                    />
                                </div>
                                <div className='flex items-center '>
                                    <button onClick={e => deleteTimeSlot(e, index)}
                                        className="text-white text-[18px]  bg-red-600 p-2 rounded-full cursor-pointer mt-6"
                                    >
                                        <AiOutlineDelete />
                                    </button>

                                </div>
                            </div>




                        </div>
                    ))}

                    <button onClick={addTimeSlot} className="bg-black text-white py-2 px-5 rounded mt-5 block">
                        Add TimeSlot
                    </button>
                </div>

                <div className="mb-5">
                    <p className='form__label'>About*</p>
                    <textArea
                        name="about"
                        rows={5}
                        value={formData.about}
                        placeholder="Write about you"
                        onChange={handleInputChange}
                        className="form__input"
                    >

                    </textArea>
                </div>
                <div className="mb-5 flex items-center gap-3">
                    {formData.photo && <figure figure className='w-[60px] h-[60px] rounded-full border-2 border-solid
                                 border-primaryColor flex items-center justify-center'>
                        <img src={formData.photo} alt="" className='w-full rounded-full' />
                    </figure>}
                    <div className='relative w-[130px] h-[50px]'>
                        <input className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                            type="file" name='photo' id='customFile' onChange={handleFileInputChange} accept=".jpg , .png" />
                        <label htmlFor="customFile"
                            className='absolute top-0 left-0 w-full h-full flex 
                                        items-center px-[0.75rem] ру-[0.375rem] text-[15px] leading-6 overflow-hidden 
                                        bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer
                                        '>Upload Photo</label>
                    </div>
                </div>
                <div className='mt-7'>
                    <button type='submit' onClick={updateProfileHandler} className='bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg'>Update Profile</button>
                </div>
            </form >
        </div >
    )
}

export default Profile;
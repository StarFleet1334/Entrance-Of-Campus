import React from 'react'
import { useGlobalContext } from '../context'
import { ToastContainer, toast } from 'react-toastify'
const People = () => {
    const { people } = useGlobalContext()
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const current = new Date();
    return (
        <section className='section'>
            <h2 className='section-title'>Visitors</h2>
            <div className='cocktails-center'>
                {people.map((item, index) => {
                    const { user_name, user_surname, user_status, visitors } = item;
                    const { id, location, car, duration, date } = visitors[0];
                    return (
                        <div className='main-container' key={index}>
                            <div className='extra-container'>
                                <div className='each-info'>
                                    <span className='info admin'>User was Invited by Name:</span>
                                    <span className='vis-info'>{user_name}</span>
                                </div>
                                <div className='each-info'>
                                    <span className='info admin'>User was Invited by Surname:</span>
                                    <span className='vis-info'>{user_surname}</span>
                                </div>
                                <div className='each-info'>
                                    <span className='info admin'>User was Invited by User of Status:</span>
                                    <span className='vis-info'>{user_status}</span>
                                </div>
                                <div className='each-info'>
                                    <span className='info admin'>Visitor's ID:</span>
                                    <span className='vis-info'>{id}</span>
                                </div>
                                <div className='each-info'>
                                    <span className='info admin'>Visitor's Sector:</span>
                                    <span className='vis-info'>{location}</span>
                                </div>
                                <div className='each-info'>
                                    <span className='info admin'>Visitor's Parking Badge:</span>
                                    <span className='vis-info'>{car}</span>
                                </div>
                                <div className='each-info'>
                                    <span className='info admin'>Visitor's Duration in Days:</span>
                                    <span className='vis-info'>{
                                        date
                                    }</span>
                                </div>
                                <div className='each-info'>
                                    <span className='info admin'>Visitor's Duration:</span>
                                    <span className='vis-info'>{duration}</span>
                                </div>
                                <div className='each-info'>
                                    <span className='info admin'>Admission Of User:</span>
                                    <button className='admission-btn' onClick={() => toast("User Has Been Approved", { theme: 'green' })}>Admission</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <ToastContainer />
        </section>
    )
}

export default People
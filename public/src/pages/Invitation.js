import React, { useState } from 'react'
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify"
import axios from 'axios'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');


const Invitation = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [invitedUser, setInvitedUser] = useState({
        name: '',
        surname: '',
        id: '',
        location: 'Residence',
        duration: 'one',
        date: '',
        car: 'no-car'
    });


    const [car, setCar] = useState({
        yes: '',
        no: ''
    });

    const closeModal = () => {
        props.setIsOpen(false);
    }

    const handleLocation = (e) => {
        if (props.status === 'student' && e.target.value !== 'Residence') {
            toast.error("Erorr", { theme: 'dark' });
        } else {
            setInvitedUser({ ...invitedUser, location: e.target.value })
        }
    }

    const handleDuration = (e) => {
        if (props.status === 'student' && e.target.value !== 'one') {
            toast.error("Erorr", { theme: 'dark' });
        } else {
            setInvitedUser({ ...invitedUser, duration: e.target.value })
        }
    }

    const handleDate = (date) => {
        setInvitedUser({ ...invitedUser, date: date })
    }



    const handleCarYes = (e) => {
        setCar({ yes: e.target.checked, no: false });
        console.log(car.yes)
        if (!car.yes) {
            setInvitedUser({ ...invitedUser, car: 'C' })
        } else {
            setInvitedUser({ ...invitedUser, car: 'no-car' })
        }
    }

    const handleCarNo = (e) => {
        setCar({ yes: false, no: e.target.checked });
        setInvitedUser({ ...invitedUser, car: 'no-car' })
    }

    const handleClick = async (e) => {
        e.preventDefault();
        if (!invitedUser.name) {
            toast('Please enter name', { theme: 'dark' })
        } else if (!invitedUser.surname) {
            toast('Please enter surname', { theme: 'dark' })
        } else if (!invitedUser.id) {
            toast('Please enter id', { theme: 'dark' })
        } else if (!car.yes && !car.no) {
            toast('Please give info about car', { theme: 'dark' })
        } else if (!invitedUser.date) {
            toast('Please enter date', { theme: 'dark' })
        }
        props.setInvitedUser(invitedUser);
        await axios.post(`http://localhost:4000/login/invited_user/${props.user}/${invitedUser.name}/${invitedUser.surname}/${invitedUser.id}/${invitedUser.location}/${invitedUser.duration}/${invitedUser.date}/${invitedUser.car}`)
            .then((e) => closeModal())
            .catch((e) => console.log(e.message))
    }



    return (
        <div>
            <Modal
                isOpen={props.isOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div>
                    <h1>Invite Your Friend</h1>
                    <form>
                        <div className='form'>
                            <label style={{ color: "black" }} htmlFor='name'>Name</label>
                            <input type='text' name='name' placeholder='Name' value={invitedUser.name}
                                onChange={(e) => setInvitedUser({ ...invitedUser, name: e.target.value })} />
                        </div>
                        <div className='form'>
                            <label style={{ color: "black" }} htmlFor='surname'>Surname</label>
                            <input type='text' name='surname' placeholder='Surname' value={invitedUser.surname}
                                onChange={(e) => setInvitedUser({ ...invitedUser, surname: e.target.value })} />
                        </div>
                        <div className='form'>
                            <label style={{ color: "black" }} htmlFor='id'>ID Number</label>
                            <input type='text' name='id' placeholder='Id Number' value={invitedUser.id}
                                onChange={(e) => setInvitedUser({ ...invitedUser, id: e.target.value })} />
                        </div>
                        <div className='form'>
                            <label style={{ color: "black" }} htmlFor='location'>Location of visiting place</label>
                            <select id='location' value={invitedUser.location} onChange={(e) => handleLocation(e)}>
                                <optgroup label='Access only the residential areas'>
                                    <option value="Residence">Residence (Green badge)</option>
                                </optgroup>
                                <optgroup label='Access to whole  campus'>
                                    <option value="General">General (Blue badge)</option>
                                </optgroup>
                                <optgroup label='Access only the academic building'>
                                    <option value="Academic">Academic (Yellow badge)</option>
                                </optgroup>
                            </select>
                        </div>
                        <div className='form'>
                            <label style={{ color: "black" }} htmlFor='duration'>Duration: </label>
                            <select id='duration' value={invitedUser.duration} onChange={(e) => handleDuration(e)}>
                                <option value='one'>One full day.</option>
                                <option value='multiple'>Multiple days.</option>
                            </select>
                            <DatePicker
                                selected={startDate}
                                onChange={(date: Date) => handleDate(date)}
                            />
                        </div>
                        <div className='form'>
                            <p>Entering with a car?</p>
                            <div className='change'>
                                <input type='checkbox' id='yes' value='huray' name='yes' onClick={(e) => handleCarYes(e)} />
                                <label style={{ color: "black" }} htmlFor='yes'>Yes</label>
                                <input type='checkbox' id='no' value='no' name='no' onClick={(e) => handleCarNo(e)} />
                                <label style={{ color: "black" }} htmlFor='no'>No</label>
                            </div>
                            {car.yes &&
                                <select value={invitedUser.car} onChange={(e) => setInvitedUser({ ...invitedUser, car: e.target.value })}>
                                    <optgroup label='F and M parking spot'>
                                        <option value='C'>C</option>
                                    </optgroup>
                                    <optgroup label='L and M parking spot'>
                                        <option value='D'>D</option>
                                    </optgroup>
                                    <optgroup label='G and M parking spot'>
                                        <option value='E'>E</option>
                                    </optgroup>
                                    <optgroup label='only M parking spot'>
                                        <option value='F'>F</option>
                                    </optgroup>
                                    <optgroup label='every parking spot'>
                                        <option value='VIP'>VIP</option>
                                    </optgroup>
                                </select>
                            }

                        </div>
                        <div className='form'>
                            <button type='submit' className='btn' onClick={(e) => handleClick(e)}>Invite</button>
                        </div>

                    </form>
                </div>
                <div className='form'>
                    <button onClick={closeModal} className='btn' >close</button>
                </div>
            </Modal>
            <ToastContainer />
        </div>
    )
}

export default Invitation
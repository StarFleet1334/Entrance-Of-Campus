import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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


const InvitedUser = (props) => {
    const [visitors, setVisitors] = useState([])
    const [dateChange, setDateChange] = useState(false)
    const [newDate, setNewDate] = useState(new Date())


    const closeModal = () => {
        props.setIsOpen(false);
    }


    useEffect(() => {
        const getVisitors = async () => {
            await axios.get(`http://localhost:4000/visitors/${props.user}`)
                .then((vis) => setVisitors(vis.data[0].visitors))
                .catch((err) => console.log(err))
        }
        getVisitors();
    }, [])

    const removeVisitor = async (id, user) => {
        console.log(id);
        const answer = prompt("Are you sure you want to remove this visitor?")
        if (answer === 'yes') {
            await axios.post(`http://localhost:4000/visitors/remove/${id}/${user}`)
                .then((vis) => setVisitors(vis.data[0].visitors))
                .catch((err) => console.log(err))
        } else {
            console.log("Think carefully next time...")
        }
    }

    const changeDate = () => {
        setDateChange(!dateChange);
    }

    const applyNewDate = async (new_date, user, visitor) => {
        setNewDate(new_date)
        await axios.post(`http://localhost:4000/visitors/edit/date/${newDate}/${user}/${visitor}`)
            .then((vis) => console.log(vis))
            .catch((err) => console.log(err))
    }

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className='scroll'>
                {visitors.length === 0 ? <h1>No Visitors</h1> : visitors.map((vis, index) => {
                    const { car, date, duration, id, location, name, surname } = vis;
                    return (
                        <div className='main-container' key={index}>
                            <div className='visitor-container'>
                                <div className='each-info'>
                                    <span className='info admin'>Name:</span>
                                    <span className='auth-info'>{name}</span>
                                </div>
                                <div className='each-info'>
                                    <span className='info admin'>Surname:</span>
                                    <span className='auth-info'>{surname}</span>
                                </div>
                                <div className='each-info'>
                                    <span className='info admin'>Location:</span>
                                    <span className='auth-info'>{location}</span>
                                </div>
                                <div className='each-info'>
                                    <span className='info admin'>Id:</span>
                                    <span className='auth-info'>{id}</span>
                                </div>
                                <div className='each-info'>
                                    <span className='info admin'>Duration:</span>
                                    <span className='auth-info'>{duration}</span>
                                </div>
                                <div className='each-info'>
                                    <span className='info admin'>Date:</span>
                                    <span className='auth-info'>{date}</span>
                                    <button className='date-edit' onClick={() => changeDate()}>Edit</button>
                                    {dateChange &&
                                        <DatePicker
                                            selected={newDate}
                                            onChange={(date: Date) => applyNewDate(date, props.user, id)}
                                        />
                                    }
                                </div>
                                <div className='each-info'>
                                    <span className='info admin'>Car:</span>
                                    <span className='auth-info'>{car}</span>
                                </div>
                            </div>
                            <div className='form'>
                                <button className='remove_visitor ' onClick={() => removeVisitor(id, props.user)}>Remove Visitor</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='form'>
                <button onClick={closeModal} className='btn' >close</button>
            </div>
        </Modal>
    )
}

export default InvitedUser
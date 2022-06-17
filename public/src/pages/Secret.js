import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { ToastContainer, Toast, toast } from "react-toastify"
import Invitation from './Invitation';
import { BsFillFileEarmarkArrowUpFill } from 'react-icons/bs';
import InvitedUser from './InvitedUser';


const Secret = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [modal, setModal] = useState(false);
    const [visitorShow, setVisitorShow] = useState(false);
    const [invitedUser, setInvitedUser] = useState();

    const logOut = () => {
        removeCookie("jwt")
        navigate('/login')
    }

    const handleModal = () => {
        setModal(!modal);
    }



    useEffect(() => {
        const verifyUser = async () => {
            if (!cookies.jwt) {
                console.log("First")
                navigate('/login')
            } else {
                const { data } = await axios.post("http://localhost:4000", {}, { withCredentials: true })
                if (!data.status) {
                    console.log("Second")
                    removeCookie("jwt")
                    navigate('/login')
                } else {
                    // toast(`Hello ${data.user}`, { theme: "dark" })
                }
            }
        }
        verifyUser();
    }, [cookies, navigate, removeCookie])

    return (
        <div className='user-info'>
            <h1>Welcome To Secret Place</h1>
            <h3>Welcome {state.status} member {state.name}</h3>
            <div>
                <h2>Details about ur account: </h2>
                <div>
                    <p><span className='info'>Your Name:</span> {state.name}</p>
                </div>
                <div>
                    <p><span className='info'>Your Surname</span>: {state.surname}</p>
                </div>
                <div>
                    <p><span className='info'>Your Id:</span> {state.id}</p>
                </div>
                <div>
                    <p><span className='info'>Your Phone Number:</span> {state.phone}</p>
                </div>
                <div>
                    <p><span className='info'>Your Password:</span> {state.password}</p>
                </div>
                <div>
                    <p><span className='info'>Your Status:</span> {state.status}</p>
                </div>
            </div>
            <div className='btn-container'>
                <button onClick={() => logOut()} className='btn'>Log Out</button>
                <button onClick={() => handleModal()} className='btn'>Invite</button>
                <BsFillFileEarmarkArrowUpFill className='next' onClick={() => setVisitorShow(true)} />
            </div>
            {<Invitation isOpen={modal} setIsOpen={setModal} status={state.status} user={state.id} setInvitedUser={setInvitedUser} />}
            {visitorShow && <InvitedUser isOpen={visitorShow} setIsOpen={setVisitorShow} user={state.id} />}
            <ToastContainer />
        </div>
    )
}

export default Secret
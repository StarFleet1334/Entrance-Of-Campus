import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
const Register = () => {
    const [value, setValue] = useState({
        name: '',
        surname: '',
        id: '',
        phone: '',
        password: '',
        status: '',
        visitors: [],
    })
    const navigate = useNavigate();


    const generateError = (err) => {
        toast.error(err, { position: "bottom-right" })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("http://localhost:4000/register", {
                ...value
            }, {
                withCredentials: true,
            })
            if (data) {
                if (data.errors) {
                    const { name, surname, id, phone, password, status } = data.errors;
                    if (name) {
                        generateError(name);
                    } else if (surname) {
                        generateError(surname);
                    } else if (id) {
                        generateError(id);
                    } else if (phone) {
                        generateError(phone);
                    } else if (password) {
                        generateError(password);
                    } else if (status) {
                        generateError(status);
                    }
                } else {
                    navigate("/login",)
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='register'>
            <h2>Register account</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='form'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' placeholder='Name' onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} />
                </div>
                <div className='form'>
                    <label htmlFor='surname'>Surname</label>
                    <input type='text' name='surname' placeholder='Surname' onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} />
                </div>
                <div className='form'>
                    <label htmlFor='id'>ID Number</label>
                    <input type='text' name='id' placeholder='Id Number' onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} />
                </div>
                <div className='form'>
                    <label htmlFor='phone'>Phone Number</label>
                    <input type='text' name='phone' placeholder='Phone Number' onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} />
                </div>
                <div className='form'>
                    <label htmlFor='passwrod'>Password</label>
                    <input type='password' name='password' placeholder='Password' onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} />
                </div>
                <div className='form'>
                    <label htmlFor='status'>Status</label>
                    <input type='text' name='status' placeholder='Status (staff/student)' onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} />
                </div>
                <div className='form'>
                    <button type='submit' className='btn'>Submit</button>
                    <span>
                        Already have an account? <Link className='reg' to='/login'>Login</Link>
                    </span>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Register
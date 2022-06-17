import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'


const Login = () => {
    const [value, setValue] = useState({
        id: '',
        password: '',
    })

    const navigate = useNavigate();


    const generateError = (err) => {
        toast.error(err, { position: "bottom-right" })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("http://localhost:4000/login", {
                ...value
            }, {
                withCredentials: true,
            })
            console.log(data);
            if (data) {
                if (data.errors) {
                    const { id, password, } = data.errors;
                    if (id) {
                        generateError(id);
                    } else if (password) {
                        generateError(password);
                    }
                } else {
                    if (data.blacked) {
                        toast("Sorry, but you are in the black list", { theme: "dark" })
                    } else {
                        navigate("/", {
                            state: { ...data }
                        })
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='register'>
            <h1 className='welcome'>Welcome To KIU Campus</h1>
            <h2>Login account</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='form'>
                    <label htmlFor='id'>ID Number</label>
                    <input type='text' name='id' placeholder='Id Number' onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} />
                </div>
                <div className='form'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' placeholder='Password' onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })} />
                </div>
                <div className='form'>
                    <button type='submit' className='btn'>Submit</button>
                    <span>
                        Don't have an account? <Link className='reg' to='/register'>Register</Link>
                    </span>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login
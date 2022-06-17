import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useGlobalContext } from '../context'


const Administration = () => {
    const [data, setData] = useState([])
    const searchValue = useRef('');
    const { registered_users, setUsers_term, addToBlackList, edit } = useGlobalContext()

    const handleChange = () => {
        setUsers_term(searchValue.current.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <h1 className='header' style={{ color: 'white' }}>Monitoring Users in the university</h1>
            <section className='section-search'>
                <div className='form-control'>
                    <form className='search-form' onSubmit={handleSubmit}>
                        <label htmlFor='visitor'>Search user by id Or by Name</label>
                        <input type='text' id='visitor' name='vsitor' ref={searchValue} onChange={handleChange} />
                    </form>
                </div>
            </section>
            <section className='section'>
                <h2 className='section-title'>Users</h2>
                <div className='cocktails-center'>
                    {registered_users.map((item, index) => {
                        const { blacked, id, name, password, phone, status, surname, } = item;
                        return (
                            <div className='check' key={index}>
                                <div className='main-container' key={index}>
                                    <div className='extra-container'>
                                        <div className='each-info'>
                                            <span className='info admin'>Name:</span>
                                            <span className='vis-info'>{name}</span>
                                            <button className='edit' onClick={() => edit(id, 'name')}>Edit Name</button>
                                        </div>
                                        <div className='each-info'>
                                            <span className='info admin'>Surname:</span>
                                            <span className='vis-info'>{surname}</span>
                                            <button className='edit' onClick={() => edit(id, 'surname')}>Edit Surname</button>
                                        </div>
                                        <div className='each-info'>
                                            <span className='info admin'>Status:</span>
                                            <span className='vis-info'>{status}</span>
                                            <button className='edit' onClick={() => edit(id, 'status')}>Edit Status</button>
                                        </div>
                                        <div className='each-info'>
                                            <span className='info admin'>ID:</span>
                                            <span className='vis-info'>{id}</span>
                                        </div>
                                        <div className='each-info'>
                                            <span className='info admin'>Password:</span>
                                            <span className='vis-info'>{password}</span>
                                            <button className='edit' onClick={() => edit(id, 'password')}>Edit Pass</button>
                                        </div>
                                        <div className='each-info'>
                                            <span className='info admin'>Phone:</span>
                                            <span className='vis-info'>{phone}</span>
                                            <button className='edit' onClick={() => edit(id, 'phone')}>Edit Phone</button>
                                        </div>
                                        <div className='each-info'>
                                            {blacked ? <p><span className='info admin'>Black-list:</span> <span className='vis-info'>true</span></p>
                                                : <p><span className='info admin'>Black-list:</span> <span className='vis-info'>false</span></p>}
                                            <button className='edit' onClick={() => edit(id, 'blacked')}>Remove From Black-list</button>
                                        </div>
                                        <div className='each-info'>
                                            <button className='addblack' onClick={() => addToBlackList(id)}>Throw to black-list</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}

export default Administration
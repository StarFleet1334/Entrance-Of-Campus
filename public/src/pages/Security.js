import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import People from './People'
import { useGlobalContext } from '../context'

const Security = () => {
    const { setSearchTerm, people } = useGlobalContext()
    const searchValue = useRef('');

    useEffect(() => {
        searchValue.current.focus();
    }, [])


    const handleChange = () => {
        setSearchTerm(searchValue.current.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="register">
            <main>
                <h1 style={{ color: 'white' }}>Monitoring people Entering the university</h1>
                <section className='section-search'>
                    <div className='form-control'>
                        <form className='search-form' onSubmit={handleSubmit}>
                            <label htmlFor='visitor'>Search Visitor by id Or by Name</label>
                            <input type='text' id='visitor' name='vsitor' ref={searchValue} onChange={handleChange} />
                        </form>
                    </div>
                </section>
                <People />
            </main>
        </div>
    )
}

export default Security
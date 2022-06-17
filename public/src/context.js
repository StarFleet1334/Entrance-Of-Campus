import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'
import axios from 'axios'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [people, setPoeple] = useState([])
    const [registered_users, setRegistered_Users] = useState([]);
    const [users_term, setUsers_term] = useState('');

    const getPeople = useCallback(async () => {
        setLoading(true);
        try {
            const vis = await axios.post('http://localhost:4000/getPeople')
            const data = vis.data.map((user) => {
                const result = user.visitors.filter((data) => {
                    if (data.name.toUpperCase() === searchTerm.toUpperCase() || data.id === searchTerm) {
                        return data;
                    }
                })

                if (result.length !== 0) {
                    let finalResult = {
                        user_name: user.name,
                        user_surname: user.surname,
                        user_status: user.status,
                        visitors: result
                    }
                    return finalResult;
                } else {
                    return null
                }
            })
            const clearedData = data.filter((item) => item != null)
            setPoeple(clearedData)

        } catch (err) {
            console.log(err.message)
            setLoading(false);
        }

    }, [searchTerm])

    const getUsers = useCallback(async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/admin')
            const answer = data.filter((user) => {
                if (user.id === users_term || user.name.toUpperCase() === users_term.toUpperCase()) {
                    return user
                }
            })
            setRegistered_Users(answer);
        } catch (err) {
            console.log(err.message);
        }
    }, [users_term])

    const addToBlackList = async (id) => {
        await axios.post(`http://localhost:4000/admin/${id}`)
            .then((users) => {
                const answer = users.data.filter((user) => {
                    if (user.id === users_term || user.name.toUpperCase() === users_term.toUpperCase()) {
                        return user
                    }
                })
                setRegistered_Users(answer)
            })
            .catch((err) => console.log(err))
    }


    const edit = async (id, feature) => {
        let value;
        if (feature === 'blacked') {
            value = prompt("Are you sure?")
        } else {
            value = prompt(`Enter your new ${feature}`)
        }

        await axios.post(`http://localhost:4000/admin/edit/${id}/${feature}/${value}`)
            .then((users) => {
                const answer = users.data.filter((user) => {
                    if (user.id === users_term || user.name.toUpperCase() === users_term.toUpperCase()) {
                        return user
                    }
                })
                setRegistered_Users(answer)
            })
            .catch((err) => console.log(err))

    }


    useEffect(() => {
        getPeople();
    }, [setSearchTerm, getPeople])

    useEffect(() => {
        getUsers();
    }, [users_term])

    return (
        <AppContext.Provider value={{
            loading, searchTerm, setSearchTerm, people, users_term, setUsers_term, registered_users, addToBlackList, edit
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }
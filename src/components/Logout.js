import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { context } from '../App'


export default function Logout() {

    const history = useHistory()
    const { dispatch } = useContext(context);

    useEffect(async () => {
        const res = await fetch('http://localhost:7100/logout', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            // body:{person:''}
        })
        const data = await res.json();
        console.log('data :>> ', data);
        window.alert(data.loggedOut)

        dispatch({ type: 'ADMIN', payload: false })
        dispatch({ type: 'POLICE', payload: false })
        history.push('/', { replace: true })
    }
        , [])
    return (
        <div><h1>Logout</h1></div>
    )
}

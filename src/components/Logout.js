import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import context from '../Context/userContext'
import { Layout, Menu, theme, message, Result } from 'antd';
import Cookies from 'js-cookie';


export default function Logout() {

    const history = useHistory()
    const { user, logged, setLogged, setUser } = useContext(context)
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(async () => {
        const res = await fetch('http://localhost:7100/logout', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        const data = await res.json();
        console.log('data :>> ', data);
        window.alert(data.loggedOut)
        setUser({ name: null, id: null });
        setLogged(false)
        // messageApi.open({
        //     type: 'success',
        //     content: (
        //         <Result
        //             status="success"
        //             title={Cookies.get('person') + " Logged out successfully"}
        //         />
        //     ),
        //     duration: 2,
        //     style: {
        //         marginTop: '10vh',
        //     },
        // });

        history.push('/', { replace: true })
    }
        , [])

    if (!user.id) {
        return (
            <>
                <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>loading...</h2>
                </div>
            </>
        )
    } else {
        return (
            <div>
                {contextHolder}
                <h1>Logout</h1>
            </div>
        )
    }
}

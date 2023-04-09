import React, { useContext } from 'react'
import context from "../Context/userContext.js";
import Cookies from 'js-cookie';

export default function Home() {
    const { user, setUser } = useContext(context);
    console.log("User in Home ; ", user);
    return (
        <>
            <div>
                <div className="home">
                    {Cookies.get('person') && <h1>Hello {Cookies.get('person')}</h1>}
                    <h2>welcome to E-challan system</h2>
                </div>
            </div>
        </>
    )
}

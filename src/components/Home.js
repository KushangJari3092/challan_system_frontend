import React, { useContext } from 'react'
import context from "../Context/userContext.js";

export default function Home() {
    const { user, setUser } = useContext(context);
    console.log("User in Home ; ", user);
    return (
        <>
            <div className="padding-top">
                <h2>welcome to E-challan system</h2>
            </div>
        </>
    )
}

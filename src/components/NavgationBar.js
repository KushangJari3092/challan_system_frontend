import React, { useContext, useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
import context from "../Context/userContext.js";
import '../style/navbar.css'


function NavigationBar() {
    const { user, logged, setLogged, nav, setNav } = useContext(context);
    useEffect(() => {
        console.log('user in nav:>> ', user);
    }, [])

    return (
        <div className={"navContainer " + nav ? "d-block" : "d-none"}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid ">
                    <Link className="navbar-brand" to="/">
                        <img src="" alt="logo" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                            {!logged &&
                                <li class="nav-item dropdown">
                                    <Link class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Login
                                    </Link>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link class="dropdown-item" to="/login/admin">Admin</Link>
                                        <Link class="dropdown-item" to="/login/police">Police</Link>
                                        <div class="dropdown-divider"></div>
                                        <Link class="dropdown-item" to="/login/user">User</Link>
                                    </div>
                                </li>
                            }
                            {logged &&
                                <li class="nav-item dropdown" >
                                    <Link class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                        Logout
                                    </Link>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown" >
                                        {
                                            Cookies.get('person') === 'admin' &&
                                            <Link class="dropdown-item" to="/dashboard" role="button" style={{ fontWeight: 'bold' }}> Dashboard</Link>
                                        }
                                        {
                                            Cookies.get('person') === 'police' &&
                                            <Link class="dropdown-item" to="/policeForm" role="button" style={{ fontWeight: 'bold' }}> Fill Challan</Link>
                                        }
                                        <div class="dropdown-divider"></div>
                                        <Link class="dropdown-item" to="/logout" role="button"> Logout</Link>
                                    </div>

                                </li>
                            }
                        </ul>
                    </div>
                </div>

            </nav>


        </div>

    );
}

export default NavigationBar;
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { context } from '../App';
import '../style/navbar.css'


function NavigationBar() {
    const { user, setUser, nav, setNav } = useContext(context);
    const isLogged = false;
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

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {!isLogged &&
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
                            {isLogged &&
                                <li class="nav-item ">
                                    <Link class="nav-link" to="/logout" role="button">
                                        Logout
                                    </Link>
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
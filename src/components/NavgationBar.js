import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/navbar.css'


function NavigationBar() {


    return (
        <div className='navContainer'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark  fixed-top">
                <div className="container-fluid ">
                    <a className="navbar-brand" href="/">
                        <img src="" alt="logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Login
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="/login/admin">Admin</a>
                                    <a class="dropdown-item" href="/login/police">Police</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="/login/user">User</a>
                                </div>
                            </li>


                        </ul>
                    </div>
                </div>

            </nav>


        </div>

    );
}

export default NavigationBar;
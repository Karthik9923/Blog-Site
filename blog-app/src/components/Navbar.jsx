import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaPlusCircle, FaSignInAlt } from 'react-icons/fa'; 

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/">Blog App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto"> 
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                <FaSignInAlt className="me-1" /> Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">
                                <FaUser className="me-1" /> Signup
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/create">
                                <FaPlusCircle className="me-1" /> Create Post
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

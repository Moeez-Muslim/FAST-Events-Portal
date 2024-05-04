import React from "react";
import {NavLink} from "react-router-dom";

function NavComp() 
{
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light navbar-bg-light">
        <div className="container">
            <NavLink className="navbar-brand" to="/events">FAST Events</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
               
                <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/events">Home</NavLink>
                </li>

                <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/my-events">My Events</NavLink>
                </li>

                <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/organizer">Organizer</NavLink>
                </li>

                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Language
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="/">English</a></li>
                    <li><a className="dropdown-item" href="/">Urdu</a></li>
                </ul>
                </li>
            </ul>
            <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search Events" aria-label="Search"/>
            </form>
            </div>
        </div>
        </nav>
      </div>
    )
}

export default NavComp;
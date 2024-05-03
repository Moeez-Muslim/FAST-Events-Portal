import React from 'react'
import BrandNav from '../BrandNav';

export default function RegisterText() {

    const myStyle = {
        backgroundImage:
            "url('https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        height: "100vh",
        width: "100vw",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        textAlign: 'center'
    };
  return (
    <div style={myStyle}>
        <BrandNav/>
        <br/><br/><br/>
        <h1 className='fs-1 text-white fw-bold mt-5' >Book Your Events</h1>
        <p className='text-white mx-auto mb-5' style={{width:"60%"}}>Welcome to FAST Events, your go-to partner for creating unforgettable experiences.<br/> Let's make it extraordinary together.</p>
        <br/><br/>
        <div className="d-grid gap-2">
            <button className="btn btn-outline-light col-6 mx-auto" type="button">Sign In</button>
            <button className="btn btn-dark col-6 mx-auto" type="button">Sign Up</button>
        </div>

    </div>
  )
}





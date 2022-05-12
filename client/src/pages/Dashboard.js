import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.js";
import { Link } from "react-router-dom";
import UserDetails from "../components/UserDetails.js";

function Dashboard() {

    const { user } = useContext(AuthContext);

    
    

	return (
        
        <div className="Dashboard">

            <UserDetails user={user}></UserDetails>
            <Link to="/upload"><button className="primary-button">Upload a track</button></Link>

		 



        </div>
	)
}

export default Dashboard;
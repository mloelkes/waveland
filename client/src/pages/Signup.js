import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleName(e) {
        setName(e.target.value);
    }

    function handleLocation(e) {
        setLocation(e.target.value);
    }

    function handleDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const requestBody = { email, password, name, location, description }

        axios.post("/api/auth/signup", requestBody)
        .then(response => {
            navigate("/")
        })
        .catch(err => {
            const errorDescription = err.response.data.message;
            setErrorMessage(errorDescription);
        })
    }
    
	return (
        <div className="Signup">

		    <h1>Create your Waveland account</h1>
            <form onSubmit={handleSubmit}>
                <span>
                    <input type="text" placeholder="E-Mail" value={email} onChange={handleEmail}></input>
                    <input type="text" placeholder="Password" value={password} onChange={handlePassword}></input>
                </span>
                <span>
                    <input type="text" placeholder="Name" value={name} onChange={handleName}></input>
                    <input type="text" placeholder="Location" value={location} onChange={handleLocation}></input>
                </span>
                
                <input id="description" placeholder="Description" value={description} onChange={handleDescription}></input>
                <button className="primary-button" type="submit">Sign Up</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
	)
}

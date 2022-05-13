import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [fileToUpload, setFileToUpload] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [uploadPictureLabel, setUploadPictureLabel] = useState("Choose profile picture");

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

        // Upload file
        const uploadData = new FormData();
        uploadData.append("imageUrl", fileToUpload);

        axios.post("api/auth/imageUpload", uploadData)
        .then(response => {
            const imageUrl = response.data.imageUrl;

            // Create user
            const requestBody = { email, password, name, location, description, imageUrl }
            axios.post("/api/auth/signup", requestBody)
            .then(response => {
                navigate("/dashboard");
            })
            .catch(err => {
                const errorDescription = err.response.data.message;
                setErrorMessage(errorDescription);
            })
        })
        .catch(err => console.log("Error while uploading the file: ", err));
    };

    function handleFileUploadButtonClick(e) {
        e.target.id = "upload-picture-button-disabled";
        document.getElementById("upload-picture").click();
    }
    
    function handleFileToUploadChange(e) {
        const file = e.target.files[0];
        setFileToUpload(file);
        setUploadPictureLabel(file.name);
    }

	return (
        <div className="Signup">

		    <h1>Create your Waveland account</h1>
            <form onSubmit={handleSubmit}>
                <span>
                    <input type="text" placeholder="E-Mail" value={email} onChange={handleEmail}></input>
                    <input type="password" placeholder="Password" value={password} onChange={handlePassword}></input>
                </span>
                <span>
                    <input type="text" placeholder="Name" value={name} onChange={handleName}></input>
                    <input type="text" placeholder="Location" value={location} onChange={handleLocation}></input>
                </span>
                <span>
                    <input placeholder="Description" value={description} onChange={handleDescription}></input>
                    <input type="button" id="upload-picture-button" value={uploadPictureLabel} onClick={(e) => handleFileUploadButtonClick(e)}/>
                    <input id="upload-picture" type="file" onChange={(e) => handleFileToUploadChange(e)}></input>
                </span>
                <button className="primary-button" type="submit">Sign Up</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
	)
}

export default Signup;

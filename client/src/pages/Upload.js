import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.js";
import UploadForm from "../components/UploadForm.js";

function Upload() {

    const { user } = useContext(AuthContext);
    

	return (
        <div className="Upload">

            <UploadForm></UploadForm>


        </div>
	)
}

export default Upload;

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileDetails from "../components/ProfileDetails.js";
import TrackList from "../components/TrackList.js";

function Profile (props) {
    const { name } = useParams();

    const [user, setUser] = useState(undefined);

    function getUserDetails() {
        axios.get(`/api/users?name=${name}`)
        .then(response => {
            setUser(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    function handlePlayTrack (trackUrl, trackImage, trackName) {
        props.handlePlayTrack(trackUrl, trackImage, trackName);
    }

    useEffect(() => {
        getUserDetails();
    }, []);
    
    return (
        <div className="Profile">
            <div className="col-1">
                <ProfileDetails user={user}></ProfileDetails>
            </div>
            <div className="col-2">
                <TrackList tracks={user?.tracks} handlePlayTrack={handlePlayTrack}></TrackList>
            </div>
            <div className="col-3">

            </div>
        </div>
    )
}

export default Profile;
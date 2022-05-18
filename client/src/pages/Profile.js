import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileDetails from "../components/ProfileDetails.js";
import TrackList from "../components/TrackList.js";
import Followers from "../components/Followers.js";
import Following from "../components/Following.js";
import Likes from "../components/Likes.js";

function Profile (props) {
    const { name } = useParams();

    const [user, setUser] = useState(undefined);
    const [tracks, setTracks] = useState(undefined);

    function initializeData() {
        axios.get(`/api/users?name=${name}`)
        .then(response => {
            console.log(response.data);
            setUser(response.data);
            getUserTracks(response.data._id);
        })
        .catch(err => {
            console.log(err);
        })
    }

    function getUserTracks(id) {
        axios.get(`/api/users/${id}/tracks`)
        .then(response => {
            setTracks(response.data);
        })
        .catch(err => {
            console.log(err)
        })
    }

    function handlePlayTrack (trackUrl, trackImage, trackName, artistName) {
        props.handlePlayTrack(trackUrl, trackImage, trackName, artistName);
    }

    useEffect(() => {
        initializeData();
    }, [name]);
    
    return (
        <div className="Profile">
            <div className="col-1">
                <ProfileDetails user={user}></ProfileDetails>
            </div>
            <div className="col-2">
                <TrackList page="profile" tracks={tracks} handlePlayTrack={handlePlayTrack}></TrackList>
            </div>
            <div className="col-3">
                <Followers user={user}></Followers>
                <Following user={user}></Following>
                <Likes tracks={user?.likes}></Likes>
            </div>
        </div>
    )
}

export default Profile;
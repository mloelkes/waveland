import { useEffect, useContext, useState } from "react";
import TrackList from "../components/TrackList.js";
import axios from "axios";
import { UserDetailsContext } from "../context/userDetails.js";
import { AuthContext } from "../context/auth.js";

function Waves(props) {
    const { userDetails } = useContext(UserDetailsContext);
    const { user } = useContext(AuthContext);

    const [tracks, setTracks] = useState([]);
    const [errorMessage, setErrorMessage] = useState(undefined);

    function getTracksByFollowedUsers() {
        axios.get(`api/users/${user?._id}/following/tracks`)
        .then(response => {
            setTracks(response.data);
        })
        .catch(err => {
            const errorDescription = err.response.data.message;
            setErrorMessage(errorDescription);
        })
    }

    function handlePlayTrack (trackUrl, trackImage, trackName, artistName) {
        props?.handlePlayTrack(trackUrl, trackImage, trackName, artistName);
    }

    useEffect(() => {
        getTracksByFollowedUsers();
    }, [user]);

    return (
        <div className="Waves">
            <TrackList page="waves" tracks={tracks} handlePlayTrack={handlePlayTrack}></TrackList>
        </div>
    )
}

export default Waves;

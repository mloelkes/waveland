import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.js";
import { Link } from "react-router-dom";
import { UserDetailsContext } from "../context/userDetails.js";
import axios from "axios";

function TrackDetails(props) {
    const { user } = useContext(AuthContext);
    const { userDetails, getUserDetails } = useContext(UserDetailsContext);

    const heartFilledUrl = "/images/icons/baseline_favorite_black_48dp.png";
    const heartOutlinedUrl = "/images/icons/baseline_favorite_border_black_48dp.png";

    const [trackLiked, setTrackLiked] = useState(false);
    const [errorMessage, setErrorMessage] = useState(undefined);

    function handleTrackDetailsClick(e) {
        const trackUrl = e.target.parentNode.attributes.trackurl.value;
        const trackImage = e.target.parentNode.attributes.trackimage.value;
        const trackName = e.target.parentNode.attributes.trackname.value;
        const artistName = e.target.parentNode.attributes.artistname.value;

        props.handlePlayTrack(trackUrl, trackImage, trackName, artistName);
    }

    useEffect(() => {
        userDetails?.likes.forEach(like => {
            if (like._id === props.track._id) {
                setTrackLiked(true);
            }
        })
    }, []);

    function handleLikeButtonClick(e) {
        e.preventDefault();

        if (trackLiked) {
            removeLike();
            getUserDetails();
        } else {
            addLike();
            getUserDetails();
        }
    }

    function addLike() {
        callAxiosPatchForLike(`api/users/${user._id}/likes`);
        setTrackLiked(true);
    }

    function removeLike() {
        callAxiosPatchForLike(`api/users/${user._id}/likes/remove`);
        setTrackLiked(false);
    }

    function callAxiosPatchForLike(route) {
        const likesFormData = {
            trackId: props.track._id
        };

        axios.patch(route, likesFormData)
        .then(response => {
        })
        .catch(err => {
            const errorDescription = err.response.data.message;
            setErrorMessage(errorDescription);
        })
    }

    return (
        <div className="TrackDetails">
        <div className="col-1">
            <button trackurl={props.track?.trackUrl} trackimage={props.track?.imageUrl} trackname={props.track?.name} artistname={props.track?.user?.name} onClick={handleTrackDetailsClick}>
                <img id="track-cover" src={props.track?.imageUrl} alt="track cover"/>
            </button>
        </div>
        <div className="col-2">
            <p>{props.track?.name}</p>
            <p>{props.track?.tag}</p>
            <p>{props.track?.description}</p>
        </div>
        <div className="col-3">
            {window.location.href.includes("waves") && 
            <>
                <p>{props.track?.user.name}</p>
                <Link to={`/${props.track?.user?.nameForUrl}`} ><img id="artist-image" src={props.track?.user?.imageUrl} alt="artist"/></Link>
            </>
            }
            {!(props.track?.user?._id === user._id) && <button onClick={handleLikeButtonClick}><img src={trackLiked ? heartFilledUrl : heartOutlinedUrl}/></button>}
        </div>
    </div>
    )
}

export default TrackDetails;

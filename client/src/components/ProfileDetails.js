import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserDetailsContext } from "../context/userDetails.js";

function ProfileDetails(props) {
    const { userDetails, getStoredToken, getUserDetails } = useContext(UserDetailsContext);

    const [errorMessage, setErrorMessage] = useState(undefined);
    const [following, setFollowing] = useState(false);

    useEffect(() => {
        userDetails?.following.forEach(followedUser => {
            if (props.user?._id === followedUser._id) {
                setFollowing(true);
            }
        })
    }, [userDetails, props.user])

    function handleFollowClick(e) {
        e.preventDefault();

        if (following) {
            unfollowUser();
        } else {
            followUser();
        }
    };

    function followUser() {
        let followingFormData = {
            followedUserId: props.user?._id
        };

        // Update following user
        axios.patch(`api/users/${userDetails._id}/following`, followingFormData)
        .then(response => {
            let followersFormData = {
                followingUserId: userDetails._id
            };

            // Update followed user
            axios.patch(`api/users/${props.user?._id}/followers`, followersFormData)
            .then(response => {
                setFollowing(true);
            })
            .catch(err => {
                const errorDescription = err.response.data.message;
                setErrorMessage(errorDescription);
            })
        })
        .catch(err => {
            const errorDescription = err.response.data.message;
            setErrorMessage(errorDescription);
        })
    };

    function unfollowUser() {
        let followingFormData = {
            followedUserId: props.user?._id
        };

        axios.patch(`api/users/${userDetails._id}/following/delete`, followingFormData)
        .then(response => {
            let followedFormData = {
                followingUserId: userDetails._id
            };
    
            axios.patch(`api/users/${props.user?._id}/followers/delete`, followedFormData)
            .then(response => {
                setFollowing(false);
            })
            .catch(err => {
                const errorDescription = err.response.data.message;
                setErrorMessage(errorDescription);
            })        
        })
        .catch(err => {
            const errorDescription = err.response.data.message;
            setErrorMessage(errorDescription);
        })             
    };

    return (
        <div className="ProfileDetails">
            <Link to={`/${props.user?.nameForUrl}`} ><img id="profile-picture" src={props.user?.imageUrl} alt="user profile"/></Link>
            <p id="profile-details-name">{props.user?.name}</p>
            <p>{props.user?.description}</p>
            <p>{props.user?.location}</p>
            <div className="follow-button-container">
                {!(userDetails?._id === props?.user?._id) && <button className={following ? "following-button following" : "following-button not-following"} onClick={handleFollowClick}>{following ? "Following" : "Follow"}</button>}
            </div>

        </div>
    )
}

export default ProfileDetails;

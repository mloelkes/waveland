import { useContext } from "react";
import { UserDetailsContext } from "../context/userDetails.js";

function UserDetails() {
    const { userDetails } = useContext(UserDetailsContext);

    return (
        <div className="UserDetails">
        <img id="profile-picture" src={userDetails?.imageUrl} alt="user profile"/>
            <p>Username: {userDetails?.name}</p>
            <p>E-Mail: {userDetails?.email}</p>
            <p>Description: {userDetails?.description}</p>
            <p>Location: {userDetails?.location}</p>
            <p>Tracks:</p>
            {userDetails?.tracks && userDetails.tracks.map(track => (
                <p key={track._id}>{track.name}</p>
            ))}
            <p>Likes:</p>
            {userDetails?.likes && userDetails.likes.map(likedTrack => (
                <p key={likedTrack._id}>{likedTrack.name}</p>
            ))}
            <p>Following:</p>
            {userDetails?.following && userDetails.following.map(followedUser => (
                <p key={followedUser._id}>{followedUser.name}</p>
            ))}
            <p>Followers:</p>
            {userDetails?.followers && userDetails.followers.map(followingUser => (
                <p key={followingUser._id}>{followingUser.name}</p>
            ))}
        </div>
    )
}

export default UserDetails;

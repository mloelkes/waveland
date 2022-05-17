import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserDetailsContext } from "../context/userDetails.js";

function UserDetails() {
    const { userDetails } = useContext(UserDetailsContext);

    return (
        <div className="UserDetails">
        <Link to={`/${userDetails?.name}`} ><img id="profile-picture" src={userDetails?.imageUrl} alt="user profile"/></Link>
            <p>Username: {userDetails?.name}</p>
            <p>E-Mail: {userDetails?.email}</p>
            <p>Description: {userDetails?.description}</p>
            <p>Location: {userDetails?.location}</p>
        </div>
    )
}

export default UserDetails;

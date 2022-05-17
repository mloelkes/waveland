import { Link } from "react-router-dom";

function ProfileDetails(props) {

    return (
        <div className="UserDetails">
        <Link to={`/${props.user?.name}`} ><img id="profile-picture" src={props.user?.imageUrl} alt="user profile"/></Link>
            <p>{props.user?.name}</p>
            <p>{props.user?.description}</p>
            <p>{props.user?.location}</p>
        </div>
    )
}

export default ProfileDetails;

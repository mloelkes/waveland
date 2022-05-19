import { Link } from "react-router-dom";

function Followers(props) {
    return (
        <div className="Followers">
        <h1>FOLLOWERS</h1>
        {props.user?.followers.map(follower => (
            <Link key={follower._id} to={`/${follower?.nameForUrl}`} className="follower">
                <img id="follower-image" src={follower?.imageUrl} alt="follower"/>
                <p>{follower?.name}</p>
                <p>{follower?.tracks.length}</p>
            </Link>
        ))}
        </div>
    )
}

export default Followers;

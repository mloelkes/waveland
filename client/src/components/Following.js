import { Link } from "react-router-dom";

function Following(props) {
    return (
        <div className="Following">
        <h1>FOLLOWING</h1>
        {props.user?.following.map(followed => (
            <Link key={followed._id} to={`/${followed?.name}`} className="followed">
                <img id="followed-image" src={followed?.imageUrl} alt="followed"/>
                <p>{followed?.name}</p>
                <p>{followed?.tracks.length}</p>
            </Link>
        ))}
        </div>
    )
}

export default Following;

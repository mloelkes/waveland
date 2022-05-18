import { Link } from "react-router-dom";

function Likes(props) {
    console.log("PROPS: ", props.tracks);

    function handlePlayTrack(trackUrl, trackImage, trackName, artistName) {
        props.handlePlayTrack(trackUrl, trackImage, trackName, artistName);
    }

    return (
        <div className="Likes">
            <h1>Likes</h1>
            {props.tracks?.map(track => (
                <Link key={track._id} track={track} handlePlayTrack={handlePlayTrack} to={`/${track?.user?.name}`} ><img id="track-cover" src={track?.imageUrl} alt="track cover"/></Link>
            ))}
        </div>
    )
}

export default Likes;

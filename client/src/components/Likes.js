import axios from "axios";

function Likes(props) {
    function handlePlayTrack(e) {
        const trackUrl = e.target.parentNode.attributes.trackurl.value;
        const trackImage = e.target.parentNode.attributes.trackimage.value;
        const trackName = e.target.parentNode.attributes.trackname.value;
        const userId = e.target.parentNode.attributes.userid.value;
        
        axios.get(`api/users/${userId}`)
        .then(response => {
            const artistName = response.data.name;
            props.handlePlayTrack(trackUrl, trackImage, trackName, artistName);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="Likes">
            <h1>Likes</h1>
            {props.tracks?.map(track => (
                <button key={track._id} onClick={handlePlayTrack} trackurl={track?.trackUrl} trackimage={track?.imageUrl} trackname={track?.name} userid={track?.user} ><img id="track-cover" src={track?.imageUrl} alt="track cover"/></button>
            ))}
        </div>
    )
}

export default Likes;

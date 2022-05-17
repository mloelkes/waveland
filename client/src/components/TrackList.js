function TrackList (props) {
   
    function handleTrackDetailsClick(e) {
        const trackUrl = e.target.parentNode.attributes.trackurl.value;
        const trackImage = e.target.parentNode.attributes.trackimage.value;
        const trackName = e.target.parentNode.attributes.trackname.value;
        const artistName = e.target.parentNode.attributes.artistname.value;

        props.handlePlayTrack(trackUrl, trackImage, trackName, artistName);
    }

    return (
        <div className="TrackList">
            {props.tracks?.map(track => (
                    <div key={track._id} className="track-details">
                        <div className="col-1">
                            <button trackurl={track.trackUrl} trackimage={track.imageUrl} trackname={track.name} artistname={track.user.name} onClick={handleTrackDetailsClick}>
                                <img id="track-cover" src={track.imageUrl} alt="track cover"/>
                            </button>
                        </div>
                        <div className="col-2">
                            {props.page === "waves" && <p>{track.user.name}</p>}
                            <p>{track.name}</p>
                            <p>{track.tag}</p>
                            <p>{track.description}</p>
                        </div>
                    </div>
            ))}
        </div>
    )
}

export default TrackList;
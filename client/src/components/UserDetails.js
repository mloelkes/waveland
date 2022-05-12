function UserDetails(props) {
    const user = props.user;

    return (
        <div className="UserDetails">
            <p>Username: {user?.name}</p>
            <p>E-Mail: {user?.email}</p>
            {/* {user.tracks && user.tracks.map(track => (
                <p>track.name</p>
            ))} */}
        </div>
    )
}

export default UserDetails;
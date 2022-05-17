import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.js";
import { UserDetailsContext } from "../context/userDetails.js";

function Navigation() {
    const { isLoggedIn, logoutUser } = useContext(AuthContext);
    const { userDetails, resetUserDetails } = useContext(UserDetailsContext);

    function handleLogoutClick() {
        logoutUser();
        resetUserDetails();
    }

    return (
        <div className="Navigation">
            <div className="navigation-content">
                {isLoggedIn ?
                    <Link className="font-accent" to="/dashboard">Waveland</Link> :
                    <Link className="font-accent" to="/">Waveland</Link>
                }
                {isLoggedIn ? 
                <span id="user-logged-in-container">
                    <Link to={`/${userDetails?.name}`} ><img id="profile-picture" src={userDetails?.imageUrl} alt="user profile"/></Link>
                    <Link className="link" to="/" onClick={handleLogoutClick}>Logout</Link>
                </span> :
                <span>
                    <Link className="link" to="/login">Login</Link>
                    <Link className="link" to="/signup">Sign Up</Link>
                </span>}
            </div>
        </div>
    );
}

export default Navigation;

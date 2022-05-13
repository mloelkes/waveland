import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.js";
import { UserDetailsContext } from "../context/userDetails.js";

function Navigation() {
    const { isLoggedIn, logoutUser } = useContext(AuthContext);
    const { resetUserDetails } = useContext(UserDetailsContext);

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
                    <Link className="link" to="/" onClick={handleLogoutClick}>Logout</Link> :
                <span>
                    <Link className="link" to="/login">Login</Link>
                    <Link className="link" to="/signup">Sign Up</Link>
                </span>}
            </div>
        </div>
    );
}

export default Navigation;

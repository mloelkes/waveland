import { useContext } from "react";
import { AuthContext } from "../context/auth.js";
import { Link } from "react-router-dom";

function Navigation() {
    const { user, isLoggedIn, logoutUser } = useContext(AuthContext);

    function handleLogoutClick() {
        logoutUser();
    }

    return (
        <div className="Navigation">
            <div className="navigation-content">
                <Link className="font-accent" to="/">Waveland</Link>
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

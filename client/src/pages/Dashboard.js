import { Link } from "react-router-dom";
import UserDetails from "../components/UserDetails.js";

function Dashboard() {
	return (
        <div className="Dashboard">
            <UserDetails></UserDetails>
            <Link to="/upload"><button className="primary-button">Upload a track</button></Link>
        </div>
	)
}

export default Dashboard;

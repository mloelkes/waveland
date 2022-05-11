import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <div className="Navigation">
      <div className="navigation-content">
        <Link className="font-accent" to="/">Waveland</Link>
        <span>
          <Link className="link" to="/login">Login</Link>
          <Link className="link" to="/signup">Signup</Link>
        </span>
      </div>

    </div>
  );
}

export default Navigation;

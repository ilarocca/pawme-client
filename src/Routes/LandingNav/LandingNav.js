import { Link } from "react-router-dom";
import "./LandingNav.css";

function LandingNav() {
  return (
    <div className="LandingNav">
      <header className="LandingHeader">
        <Link to="/">
          <button>Pawme</button>
        </Link>
      </header>
      <nav className="signup-login">
        <Link to="/login" className="login-link">
          Log In
        </Link>
        <Link to="/signup" className="signup-link">
          Sign Up
        </Link>
        {/* <button className="demo-submit" onClick={handleClick}>
          Demo
        </button> */}
      </nav>
    </div>
  );
}

export default LandingNav;

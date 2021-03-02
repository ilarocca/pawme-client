import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthApiService from "../../Services/auth-api-service";
import AuthContext from "../../Contexts/AuthContext";
import pawme from "./pawme.png";
import "./LandingNav.css";

function LandingNav(props) {
  const context = useContext(AuthContext);

  async function handleClick(e) {
    e.preventDefault();
    const response = await AuthApiService.login("user", "password");
    context.login(response.authToken);
    context.setCurrentUser(response.user);
    const preferences = await AuthApiService.getUserPreferences(
      response.user.id,
      response.authToken
    );
    delete response.authToken;
    context.setCurrentPreferences(preferences);

    props.props.history.push("/homepage");
  }
  return (
    <div className="LandingNav">
      <header className="LandingHeader">
        <Link to="/">
          <img src={pawme} alt="pawme" className="LandingTitle" />
        </Link>
      </header>
      <nav className="signup-login">
        <Link to="/login" className="login-link">
          Log In
        </Link>
        <Link to="/signup" className="signup-link">
          Sign Up
        </Link>
        <button className="demo-link" onClick={handleClick}>
          Demo
        </button>
      </nav>
    </div>
  );
}

export default LandingNav;

import { useContext } from "react";
import AuthContext from "../../Contexts/AuthContext";
import { Link } from "react-router-dom";
import "./MainNav.css";
import pawme from "../LandingNav/pawme.png";
import PreferenceNav from "../../Components/PreferenceNav/PreferenceNav";
import { GiHamburgerMenu } from "react-icons/gi";

function MainNav(props) {
  //toggle mobile nav bar
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let mainNav = document.getElementById("js-menu");
    mainNav.classList.toggle("active");
  };

  const context = useContext(AuthContext);
  const handleSignOut = () => {
    context.logout();
  };

  const handleFetch = () => {
    props.handleFetch();
  };

  return (
    <nav className="navbar">
      <span
        className="navbar-toggle"
        id="js-navbar-toggle"
        onClick={handleClick}
      >
        <GiHamburgerMenu />
      </span>
      <button className="logo">
        <Link to="/homepage">
          <img src={pawme} alt="pawme" className="MainLogo" />
        </Link>
      </button>

      <ul className="main-nav" id="js-menu">
        <li>
          <Link to={`/potential-pals`} className="nav-links">
            Saved Pals
          </Link>
        </li>
        <li>
          <Link to={`/`} className="nav-links" onClick={handleSignOut}>
            SignOut
          </Link>
        </li>
        <div className="nav-pref">
          <PreferenceNav handleFetch={handleFetch} />
        </div>
      </ul>
    </nav>
  );
}

export default MainNav;

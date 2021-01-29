import { Component } from "react";
import { Link } from "react-router-dom";
import "./MainNav.css";

class MainNav extends Component {
  // static contextType = AuthContext;

  // state = {
  //   username: this.context.currentUser.username,
  //   clicked: false,
  // };

  // //toggle mobile nav bar
  // handleClick = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   let mainNav = document.getElementById("js-menu");
  //   mainNav.classList.toggle("active");
  // };

  render() {
    // const username = this.state.username;
    return (
      <nav className="navbar">
        <span
          className="navbar-toggle"
          id="js-navbar-toggle"
          // onClick={this.handleClick}
        ></span>
        <button className="logo">
          <Link to="/homepage">
            <div className="MainLogo">Pawme</div>
          </Link>
        </button>

        <ul className="main-nav" id="js-menu">
          <li>
            <Link to={`/potential-pals`} className="nav-links">
              Potential Pals
            </Link>
          </li>
          <li>
            <Link to={`/signout`} className="nav-links">
              Sign Out
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default MainNav;

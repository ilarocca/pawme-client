import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingMain from "./Routes/LandingMain/LandingMain";
import LandingNav from "./Routes/LandingNav/LandingNav";
import LogIn from "./Routes/LogIn/LogIn";
import HomePage from "./Routes/HomePage/HomePage";
import MainNav from "./Routes/MainNav/MainNav";
import SignOut from "./Routes/SignOut/SignOut";
import SignUp from "./Routes/SignUp/SignUp";

class App extends React.Component {
  renderNavRoutes() {
    return (
      <React.Fragment>
        <Route exact path={["/", "/signup", "/login"]} component={LandingNav} />
        <Route
          path={["/homepage", "/potential-pals", "/signout"]}
          component={MainNav}
        />
      </React.Fragment>
    );
  }
  renderMainRoutes() {
    return (
      <React.Fragment>
        <Route exact path="/" component={LandingMain} />
        <Route path="/login" component={LogIn} />
        <Route path="/homepage" component={HomePage} />
        <Route path="/signout" component={SignOut} />
        <Route path="/signup" component={SignUp} />
      </React.Fragment>
    );
  }
  render() {
    return (
      <div className="App">
        <nav className="app-nav">{this.renderNavRoutes()}</nav>
        <main className="app-main">{this.renderMainRoutes()}</main>
        {/* <div>{this.context.error}</div> */}
      </div>
    );
  }
}

export default App;

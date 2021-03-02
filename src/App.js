import React from "react";
import { Route, withRouter } from "react-router-dom";
import LandingMain from "./Routes/LandingMain/LandingMain";
import LandingNav from "./Routes/LandingNav/LandingNav";
import LogIn from "./Routes/LogIn/LogIn";
import HomePage from "./Routes/HomePage/HomePage";
import PotentialPals from "./Routes/PotentialPals/PotentialPals";
import MainNav from "./Routes/MainNav/MainNav";
import SignUp from "./Routes/SignUp/SignUp";

function App() {
  function renderNavRoutes() {
    return (
      <React.Fragment>
        <Route
          exact
          path={["/signup", "/login"]}
          render={(props) => <LandingNav {...props} />}
        />
        <Route path={["/potential-pals"]} render={MainNav} />
      </React.Fragment>
    );
  }
  function renderMainRoutes() {
    return (
      <React.Fragment>
        <Route exact path="/" component={LandingMain} />
        <Route path="/login" component={LogIn} />
        <Route path="/homepage" component={HomePage} />
        <Route path="/potential-pals" component={PotentialPals} />
        <Route path="/signup" component={SignUp} />
      </React.Fragment>
    );
  }

  return (
    <div className="App">
      <nav className="app-nav">{renderNavRoutes()}</nav>
      <main className="app-main">{renderMainRoutes()}</main>
    </div>
  );
}

export default withRouter(App);

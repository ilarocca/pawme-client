import React from "react";
import { Route } from "react-router-dom";
import LandingMain from "./Routes/LandingMain/LandingMain";
import LandingNav from "./Routes/LandingNav/LandingNav";
import LogIn from "./Routes/LogIn/LogIn";
import HomePage from "./Routes/HomePage/HomePage";
import MainNav from "./Routes/MainNav/MainNav";
import SignOut from "./Routes/SignOut/SignOut";
import SignUp from "./Routes/SignUp/SignUp";

function App() {
  function renderNavRoutes() {
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
  function renderMainRoutes() {
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

  return (
    <div className="App">
      <nav className="app-nav">{renderNavRoutes()}</nav>
      <main className="app-main">{renderMainRoutes()}</main>
      {/* <div>{this.context.error}</div> */}
    </div>
  );
}

export default App;

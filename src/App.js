import React from "react";
import { withRouter } from "react-router-dom";
import LandingMain from "./Routes/LandingMain/LandingMain";
import LandingNav from "./Routes/LandingNav/LandingNav";
import LogIn from "./Routes/LogIn/LogIn";
import HomePage from "./Routes/HomePage/HomePage";
import SavedPals from "./Routes/SavedPals/SavedPals";
import MainNav from "./Routes/MainNav/MainNav";
import SignUp from "./Routes/SignUp/SignUp";
import PublicOnlyRoute from "./Components/Utils/PublicOnlyRoute";
import PrivateRoute from "./Components/Utils/PrivateRoute";

function App() {
  function renderNavRoutes() {
    return (
      <React.Fragment>
        <PublicOnlyRoute
          exact
          path={["/signup", "/login"]}
          component={LandingNav}
        />
        <PrivateRoute path={["/saved-pals"]} component={MainNav} />
      </React.Fragment>
    );
  }
  function renderMainRoutes() {
    return (
      <React.Fragment>
        <PublicOnlyRoute exact path="/" component={LandingMain} />
        <PublicOnlyRoute path="/login" component={LogIn} />
        <PublicOnlyRoute path="/signup" component={SignUp} />
        <PrivateRoute path="/homepage" component={HomePage} />
        <PrivateRoute path="/saved-pals" component={SavedPals} />
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

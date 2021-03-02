import React from "react";
import { useState, useRef } from "react";
import { Route } from "react-router-dom";
import LandingMain from "./Routes/LandingMain/LandingMain";
import LandingNav from "./Routes/LandingNav/LandingNav";
import LogIn from "./Routes/LogIn/LogIn";
import HomePage from "./Routes/HomePage/HomePage";
import PotentialPals from "./Routes/PotentialPals/PotentialPals";
import MainNav from "./Routes/MainNav/MainNav";
import SignUp from "./Routes/SignUp/SignUp";

function App() {
  const handleFetch = useRef;

  function renderNavRoutes() {
    return (
      <React.Fragment>
        <Route exact path={["/signup", "/login"]} component={LandingNav} />
        <Route
          path={["/potential-pals"]}
          render={(props) => <MainNav handleFetch={handleFetch} {...props} />}
        />
      </React.Fragment>
    );
  }
  function renderMainRoutes() {
    return (
      <React.Fragment>
        <Route exact path="/" component={LandingMain} />
        <Route path="/login" component={LogIn} />
        <Route
          path="/homepage"
          render={(props) => <HomePage ref={handleFetch} {...props} />}
        />
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

export default App;

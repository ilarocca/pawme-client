import React from "react";
import { Link } from "react-router-dom";
import "./SignOut.css";

function SignOut() {
  return (
    <div className="sign-out">
      <Link to="/">
        <button className="button">SignOut</button>
      </Link>
    </div>
  );
}

export default SignOut;

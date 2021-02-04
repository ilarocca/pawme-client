import { React, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../Contexts/AuthContext";
import "./SignOut.css";

function SignOut() {
  const context = useContext(AuthContext);
  const handleSignOut = () => {
    context.logout();
  };

  return (
    <div className="sign-out">
      <Link to="/">
        <button className="button" onClick={handleSignOut}>
          SignOut
        </button>
      </Link>
    </div>
  );
}

export default SignOut;

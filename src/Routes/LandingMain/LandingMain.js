import { Link } from "react-router-dom";
import "./LandingMain.css";

function LandingMain() {
  return (
    <>
      <header className="tagline">
        <div>
          <h1 className="tagline-text">Find your new best friend today.</h1>
          <Link to="/signup">
            <button className="get-started">Create Profile</button>
          </Link>
        </div>
      </header>

      <div className="descriptions">
        <section className="start">
          <div className="text">
            {/* <FaDog size={35}></FaDog> */}
            <p>Sign up, fill out your bio, and set your preferences.</p>
          </div>
        </section>
        <section className="use">
          <div className="text">
            <p>Click right to add to your Potential Pals page.</p>
          </div>
        </section>
        <section className="do">
          <div className="text">
            <p>
              Narrow down your search, contact the adoption center, and go pick
              up your new buddy!
            </p>
          </div>
        </section>
      </div>
      <footer className="footer">
        <div>&#169;Pawme</div>{" "}
        {/* <div className="demo-notes">
          <i>
            To use the demo account, select 'demo' icon. To get back to the
            landing page go to 'My Account' and 'sign out'.
          </i>
        </div> */}
      </footer>
    </>
  );
}

export default LandingMain;

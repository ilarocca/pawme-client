import { Link } from "react-router-dom";
import "./LandingMain.css";
import logo from "./logo.png";
import why from "./why.jpg";
import LandingNav from "../../Routes/LandingNav/LandingNav";
import { GoPencil } from "react-icons/go";
import { RiHeartAddLine } from "react-icons/ri";
import { FaDog } from "react-icons/fa";

function LandingMain(props) {
  return (
    <>
      <header className="tagline">
        <div className="landing-nav">
          <LandingNav props={props} />
        </div>
        <div className="layer">
          <h1 className="tagline-text">Find your new best friend today.</h1>
          <Link to="/signup">
            <button className="get-started">Create Profile</button>
          </Link>
        </div>
      </header>

      <h2 className="how-title">How It Works</h2>
      <div className="how">
        <div className="descriptions">
          <section className="how-box">
            <div className="text">
              <GoPencil size={40} />
              <p>Sign up and set your preferences.</p>
            </div>
          </section>

          <section className="how-box">
            <div className="text">
              <RiHeartAddLine size={40} />
              <p>Add animals to your Saved Pals page.</p>
            </div>
          </section>

          <section className="how-box">
            <div className="text">
              <FaDog size={40} />
              <p>Contact the shelter and go pick up your new pal!</p>
            </div>
          </section>
        </div>
      </div>

      <div className="why">
        <h2 className="why-title">Why Adopt?</h2>
        <div className="why-body">
          The number of euthanized animals could be reduced dramatically if more
          people adopted pets instead of buying them. When you adopt, you save a
          loving animal by making them part of your family and open up shelter
          space for another animal who might desperately need it.
        </div>
        <img src={why} alt="boy-and-dog" className="why-img" />
      </div>

      <footer className="footer">
        <img src={logo} alt="pawme-logo" />
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

import React from "react";
import "./HomePage.css";
import doggy from "./doggy.jpg";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default class HomePage extends React.Component {
  render() {
    return (
      <>
        <div className="bio">
          <h2>Doggy</h2>
          <img src={doggy} alt="doggy" className="doggo"></img>
          <div className="info">
            <div>Age: 2</div>
            <div>Location: 5 miles from you</div>
            <button>Find Out More</button>
          </div>

          <div></div>
          <div className="swipe">
            {/* <button>Not Interested</button>
            <button>Interested</button> */}
            <AiOutlineCloseCircle
              size={50}
              color="red"
              className="no"
            ></AiOutlineCloseCircle>
            <AiOutlineCheckCircle
              size={50}
              color="green"
              className="yes"
            ></AiOutlineCheckCircle>
          </div>
        </div>
      </>
    );
  }
}

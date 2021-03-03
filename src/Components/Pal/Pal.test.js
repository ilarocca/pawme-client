import React from "react";
import ReactDOM from "react-dom";
import Pal from "./Pal";

describe("Pal Component", () => {
  const currentAnimal = {
    age: "Young",
    dateCreated: "2021-03-02T20:48:13.181Z",
    description:
      "Primary Color: Grey Secondary Color: White Weight: 6.2lbs Age: 0yrs 7mths 0wks Animal has been Spayed",
    email: "lhsinfo@lexingtonhumanesociety.org",
    id: 14,
    img: "",
    location: "Lexington, KY",
    name: "Willow",
    petId: 50711395,
    phone: "859.233.0044 x223",
    url: "https://www.petfinder.com/cat/willow-50711395/ky/lexington",
  };
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Pal currentAnimal={currentAnimal} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

import React from "react";
import ReactDOM from "react-dom";
import AuthContext from "../../Contexts/AuthContext";
import Animal from "./Animal";

describe("Animal Component", () => {
  const currentAnimal = {
    age: "Adult",
    breeds: {
      primary: "Yorkshire Terrier",
    },
    contact: {
      address: {
        address1: "W6127 Kiesling Rd.",
        address2: null,
        city: "Jefferson",
        state: "WI",
        postcode: "53549",
      },
      email: "shelter@hsjc-wis.com",
      phone: "(920) 674-2048",
    },
    description: "cute doggie",
    distance: null,
    gender: "Male",
    id: 50711420,
    name: "Snickers",
    photos: [
      {
        full:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/50711412/1/?bust=1614718310",
      },
      {
        full: "asjdlansd",
      },
    ],
    url:
      "https://www.petfinder.com/bird/moira-29060-509-50711412/va/manassas/prince-william-county-animal-shelter-va331/?referrer_id=2254d6cd-e025-47bb-a3b5-11c9f24a017a",
  };

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Animal currentAnimal={currentAnimal} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

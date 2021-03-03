import React from "react";
import ReactDOM from "react-dom";
import AuthContext from "../../Contexts/AuthContext";
import PreferenceNav from "./PreferenceNav";

describe("PreferenceNav Component", () => {
  const userPreference = {
    age: "",
    declawed: false,
    distance: null,
    gender: "",
    good_with_cats: false,
    good_with_children: false,
    good_with_dogs: false,
    house_trained: false,
    location: "",
    size: "",
    special_needs: false,
    type: "",
    user_id: 2,
  };
  it("renders without crashing", () => {
    const div = document.createElement("div");
    div.setAttribute("id", "root");
    ReactDOM.render(
      <AuthContext.Provider value={{ userPreferences: userPreference }}>
        <PreferenceNav />
      </AuthContext.Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

import { useContext } from "react";
import { useForm } from "react-hook-form";
import AuthApiService from "../../Services/auth-api-service";
import AuthContext from "../../Contexts/AuthContext";
import "./PreferenceNav.css";

export default function PreferenceNav(props) {
  const { register, handleSubmit, errors } = useForm();
  const context = useContext(AuthContext);

  const updatePreferences = async (data) => {
    const {
      type,
      distance,
      location,
      size,
      age,
      gender,
      goodWithChildren,
      goodWithDogs,
      goodWithCats,
      houseTrained,
      declawed,
      specialNeeds,
    } = data;
    const newPreferences = {
      type,
      distance,
      location,
      size,
      age,
      gender,
      goodWithChildren,
      goodWithDogs,
      goodWithCats,
      houseTrained,
      declawed,
      specialNeeds,
    };
    // console.log(newPreferences);
    try {
      const res = await AuthApiService.createUserPreferences(newPreferences);
      context.setCurrentPreferences(res);
    } catch (err) {
      console.log(err);
    }
    props.handleFetch();
  };

  return (
    <nav>
      <form className="query-nav" onSubmit={handleSubmit(updatePreferences)}>
        <label htmlFor="animal-type">Type:</label>
        <select name="type" id="js-animal-type" ref={register}>
          <option value="dog">Dogs</option>
          <option value="cat">Cats</option>
          <option value="rabbit">Rabbits</option>
          <option value="small-furry">Small & Furry</option>
          <option value="horse">Horses</option>
          <option value="bird">Birds</option>
          <option value="scales-fins-other">Scales, Fins, & Other</option>
          <option value="barnyard">Barnyard</option>
        </select>

        <label htmlFor="distance">Distance:</label>
        <select name="distance" ref={register}>
          <option value="">Any</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="250">250</option>
          <option value="500">500</option>
        </select>

        <label>Location:</label>
        <input name="location" placeholder="city, state" ref={register} />

        <label htmlFor="size">Size</label>
        <select name="size" ref={register}>
          <option value="">Any</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="xlarge">X-Large</option>
        </select>

        <label htmlFor="gender">Gender</label>
        <select name="gender" ref={register}>
          <option value="">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label htmlFor="age">Age</label>
        <select name="age" ref={register}>
          <option value="">Any</option>
          <option value="baby">Baby</option>
          <option value="young">Young</option>
          <option value="adult">Adult</option>
          <option value="senior">Senior</option>
        </select>

        <h4 className="query-name">Good With</h4>
        <label htmlFor="goodWithChildren">
          <input type="checkbox" name="goodWithChildren" ref={register} />
          Children
        </label>
        <label htmlFor="goodWithDogs">
          <input type="checkbox" name="goodWithDogs" ref={register} />
          Dogs
        </label>
        <label htmlFor="goodWithCats">
          <input type="checkbox" name="goodWithCats" ref={register} />
          Cats
        </label>

        <h4 className="careAndBehavior">Care And Behavior</h4>
        <label htmlFor="houseTrained">
          <input type="checkbox" name="houseTrained" ref={register} />
          House Trained
        </label>
        <label htmlFor="declawed">
          <input type="checkbox" name="declawed" ref={register} />
          Declawed
        </label>
        <label htmlFor="specialNeeds">
          <input type="checkbox" name="specialNeeds" ref={register} />
          Special Needs
        </label>

        <button className="query-btn" onSubmit={updatePreferences}>
          Update
        </button>
      </form>
    </nav>
  );
}

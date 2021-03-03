import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthApiService from "../../Services/auth-api-service";
import AuthContext from "../../Contexts/AuthContext";
import "./PreferenceNav.css";

export default function PreferenceNav(props) {
  const [error, setError] = useState();
  const { register, handleSubmit } = useForm();
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
    try {
      const res = await AuthApiService.createUserPreferences(newPreferences);
      context.setCurrentPreferences(res);
    } catch (err) {
      setError((error) => (error = err.message));
    }
    props.handleFetch();
  };

  return (
    <nav>
      <form
        className="query-nav"
        id="js-menu"
        onSubmit={handleSubmit(updatePreferences)}
      >
        <div className="top-pref">
          <label>
            Type:
            <select
              name="type"
              ref={register}
              defaultValue={context.userPreferences.type}
            >
              <option value="dog">Dogs</option>
              <option value="cat">Cats</option>
              <option value="rabbit">Rabbits</option>
              <option value="small-furry">Small & Furry</option>
              <option value="horse">Horses</option>
              <option value="bird">Birds</option>
              <option value="scales-fins-other">Scales, Fins, & Other</option>
              <option value="barnyard">Barnyard</option>
            </select>
          </label>

          <label>
            Distance:
            <select
              name="distance"
              ref={register}
              defaultValue={context.userPreferences.distance}
            >
              <option value="">Any</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="250">250</option>
              <option value="500">500</option>
            </select>
          </label>

          <label>
            Location:
            <input
              name="location"
              placeholder="city, state"
              ref={register}
              defaultValue={context.userPreferences.location}
            />
          </label>

          <label>
            Size
            <select
              name="size"
              ref={register}
              defaultValue={context.userPreferences.size}
            >
              <option value="">Any</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="xlarge">X-Large</option>
            </select>
          </label>

          <label>
            Gender
            <select
              name="gender"
              ref={register}
              defaultValue={context.userPreferences.gender}
            >
              <option value="">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>

          <label>
            Age
            <select
              name="age"
              ref={register}
              defaultValue={context.userPreferences.age}
            >
              <option value="">Any</option>
              <option value="baby">Baby</option>
              <option value="young">Young</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
            </select>
          </label>
        </div>

        <h4 className="query-name">Good With</h4>
        <label>
          <input
            type="checkbox"
            name="goodWithChildren"
            ref={register}
            defaultChecked={context.userPreferences.good_with_children}
          />
          Children
        </label>
        <label>
          <input
            type="checkbox"
            name="goodWithDogs"
            ref={register}
            defaultChecked={context.userPreferences.good_with_dogs}
          />
          Dogs
        </label>
        <label>
          <input
            type="checkbox"
            name="goodWithCats"
            ref={register}
            defaultChecked={context.userPreferences.good_with_cats}
          />
          Cats
        </label>

        <h4 className="careAndBehavior">Care And Behavior</h4>
        <label>
          <input
            type="checkbox"
            name="houseTrained"
            ref={register}
            defaultChecked={context.userPreferences.house_trained}
          />
          House Trained
        </label>
        <label>
          <input
            type="checkbox"
            name="declawed"
            ref={register}
            defaultChecked={context.userPreferences.declawed}
          />
          Declawed
        </label>
        <label>
          <input
            type="checkbox"
            name="specialNeeds"
            ref={register}
            defaultChecked={context.userPreferences.special_needs}
          />
          Special Needs
        </label>

        <button className="query-btn" onSubmit={updatePreferences}>
          Update
        </button>
        <div>{error}</div>
      </form>
    </nav>
  );
}

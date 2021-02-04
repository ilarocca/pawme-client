import { useContext } from "react";
import { useForm } from "react-hook-form";
import AuthApiService from "../../Services/auth-api-service";
import AuthContext from "../../Contexts/AuthContext";
import "./PreferenceNav.css";

export default function PreferenceNav() {
  const { register, handleSubmit, errors } = useForm();
  const context = useContext(AuthContext);

  const updatePreferences = async (data) => {
    const { type, distance, location } = data;
    const newPreferences = { type, distance, location };
    try {
      const res = await AuthApiService.createUserPreferences(newPreferences);
      context.setCurrentPreferences(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav>
      <form
        className="preference-nav"
        onSubmit={handleSubmit(updatePreferences)}
      >
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
        <button onSubmit={updatePreferences}>Update</button>
      </form>
    </nav>
  );
}

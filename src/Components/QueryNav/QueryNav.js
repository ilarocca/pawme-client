import "./QueryNav.css";

export default function QueryNav() {
  return (
    <form className="query-nav">
      <h3>Filters</h3>
      <label>Size</label>
      <select>
        <option value="">Any</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
        <option value="xlarge">X-Large</option>
      </select>

      <label>Gender</label>
      <select>
        <option value="">Any</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <label>Age</label>
      <select>
        <option value="">Any</option>
        <option value="baby">Baby</option>
        <option value="young">Young</option>
        <option value="adult">Adult</option>
        <option value="senior">Senior</option>
      </select>

      <h4 className="query-name">Care & Behavior</h4>
      <label>
        <input type="checkbox" />
        Special Needs
      </label>
      <label>
        <input type="checkbox" />
        House Trained
      </label>
      <label>
        <input type="checkbox" />
        Declawed
      </label>

      <h4 className="query-name">Good With</h4>
      <label>
        <input type="checkbox" />
        Children
      </label>
      <label>
        <input type="checkbox" />
        Dogs
      </label>
      <label>
        <input type="checkbox" />
        Cats
      </label>

      <button className="query-btn">APPLY FILTERS</button>
    </form>
  );
}

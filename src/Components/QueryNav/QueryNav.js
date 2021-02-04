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

      <label>Good With</label>
      <select>
        <option value="">Any</option>
        <option value="male">Kids</option>
        <option value="female">Other Dogs</option>
        <option value="cats">Cats</option>
      </select>
      <button className="query-btn">APPLY FILTERS</button>
    </form>
  );
}

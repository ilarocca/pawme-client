import doggy from "./doggy.jpg";

export default function Animal(props) {
  console.log(props);
  return (
    <div className="bio">
      <h2 className="animal-name">{props.currentAnimal.name}</h2>
      <img
        src={
          props.currentAnimal.photos[0] !== undefined
            ? props.currentAnimal.photos[0].full
            : doggy
        }
        alt="doggy"
        className="doggo"
      ></img>
      <div className="info">
        <div>{props.currentAnimal.age}</div>
        <div>{props.currentAnimal.gender}</div>
        <div>{props.currentAnimal.breeds.primary}</div>
        <div>
          {props.currentAnimal.contact.address.city},{" "}
          {props.currentAnimal.contact.address.state}
        </div>
        {props.currentAnimal.distance === null ? (
          <div>Enter your location to see distance</div>
        ) : (
          <div>{props.currentAnimal.distance} miles from you</div>
        )}

        <div>
          <b>Description:</b> {props.currentAnimal.description}{" "}
          <a href={props.currentAnimal.url} target="_blank" rel="noreferrer">
            Contact Shelter
          </a>
        </div>
      </div>
    </div>
  );
}

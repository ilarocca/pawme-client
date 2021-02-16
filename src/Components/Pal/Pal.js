import dog from "./dog.jpg";
import "./Pal.css";

export default function Pal(props) {
  const deletePal = () => {
    props.deletePal(props.currentAnimal.petId);
  };
  return (
    <div className="pal">
      <div className="bio">
        <button onClick={deletePal}>delete</button>
        <h2 className="animal-name">{props.currentAnimal.name}</h2>
        <img
          src={props.currentAnimal.img !== "" ? props.currentAnimal.img : dog}
          alt="doggy"
          className="doggo"
        ></img>
        <div className="info">
          <div>{props.currentAnimal.age}</div>
          <div>{props.currentAnimal.gender}</div>
          <div>{props.currentAnimal.location}</div>

          <div>
            <b>Description:</b> {props.currentAnimal.description}{" "}
            <a href={props.currentAnimal.url} target="_blank" rel="noreferrer">
              Contact Shelter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

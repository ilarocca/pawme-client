import dog from "./dog.jpg";
import "./Pal.css";

export default function Pal(props) {
  const deletePal = () => {
    props.deletePal(props.currentAnimal.petId);
  };
  return (
    <div className="pal">
      <div className="pal-bio">
        <div className="bio-no-delete">
          <img
            src={props.currentAnimal.img !== "" ? props.currentAnimal.img : dog}
            alt="doggy"
            className="doggo"
          ></img>
          <div className="info">
            <h2 className="pal-name">{props.currentAnimal.name}</h2>

            <div>{props.currentAnimal.age}</div>
            <div>{props.currentAnimal.gender}</div>
            <div>{props.currentAnimal.location}</div>

            <div>
              <b>Description:</b> {props.currentAnimal.description}{" "}
              <a
                href={props.currentAnimal.url}
                target="_blank"
                rel="noreferrer"
                className="contact"
              >
                Contact Shelter
              </a>
            </div>
          </div>
        </div>
        <button className="delete-pal" onClick={deletePal}>
          Delete Pal
        </button>
      </div>
    </div>
  );
}

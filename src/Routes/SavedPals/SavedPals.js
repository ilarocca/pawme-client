import { useState, useEffect, useContext } from "react";
import UserPetApiService from "../../Services/user-pet-api-service";
import AuthContext from "../../Contexts/AuthContext";
import Pal from "../../Components/Pal/Pal";
import "./SavedPals.css";

function SavedPals() {
  const [state, setState] = useState({
    animals: [],
    totalAnimals: 0,
  });
  const context = useContext(AuthContext);

  useEffect(() => {
    if (state.totalAnimals === 0) {
      fetchPals();
    }
  });

  const fetchPals = async () => {
    const pals = await UserPetApiService.getUserAnimals(context.currentUser.id);
    setState({
      animals: pals.interested,
      totalAnimals: 1,
    });
  };

  const deletePal = async (palId) => {
    await UserPetApiService.deleteUserAnimal(context.currentUser.id, palId);
    fetchPals();
  };

  //being used as a loading screen/not show anything until animals are fetched
  if (state.totalAnimals === 0) {
    return <></>;
  }
  //sort animals by date created
  const sortedAnimals = state.animals.sort((a, b) =>
    a.dateCreated < b.dateCreated ? 1 : -1
  );
  console.log(sortedAnimals);
  return (
    <div className="background">
      <ul className="pal-list">
        {state.animals.length === 0 ? (
          <div className="add-pals">Go add some pals!</div>
        ) : (
          <></>
        )}
        {sortedAnimals.map((animal) => {
          return (
            <li className="pal-list-item">
              <Pal currentAnimal={animal} deletePal={deletePal} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SavedPals;

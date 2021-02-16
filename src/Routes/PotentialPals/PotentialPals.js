import { useState, useEffect, useContext } from "react";
import UserPetApiService from "../../Services/user-pet-api-service";
import AuthContext from "../../Contexts/AuthContext";
import Pal from "../../Components/Pal/Pal";

function PotentialPals() {
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
    console.log(pals);
    setState({
      animals: pals,
      totalAnimals: 1,
    });
  };

  const deletePal = async (palId) => {
    console.log(palId);
    await UserPetApiService.deleteUserAnimal(context.currentUser.id, palId);
    fetchPals();
  };

  //being used as a loading screen/not show anything until animals are fetched
  if (state.totalAnimals === 0) {
    return (
      <>
        <div>...finding your potential pals, one sec...</div>{" "}
      </>
    );
  }
  //sort animals by date created
  const sortedAnimals = state.animals.sort((a, b) =>
    a.dateCreated < b.dateCreated ? 1 : -1
  );
  return (
    <>
      {sortedAnimals.map((animal) => {
        return <Pal currentAnimal={animal} deletePal={deletePal} />;
      })}
    </>
  );
}

export default PotentialPals;

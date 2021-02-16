import { useState, useEffect, useContext } from "react";
import "./HomePage.css";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import PetFinderApiService from "../../Services/petfinder-api-service";
import AuthContext from "../../Contexts/AuthContext";
import PreferenceNav from "../../Components/PreferenceNav/PreferenceNav";
import Animal from "../../Components/Animal/Animal";
import TokenService from "../../Services/TokenService";
import AuthApiService from "../../Services/auth-api-service";
import AnimalApiService from "../../Services/animal-api-service";
import UserPetApiService from "../../Services/user-pet-api-service";

export default function HomePage() {
  const [state, setState] = useState({
    animals: [],
    currentAnimal: {},
    currentNumber: 0,
    totalAnimals: 0,
  });
  const context = useContext(AuthContext);
  useEffect(() => {
    if (state.totalAnimals === 0) {
      handleFetch();
    }
    console.log(state);
  });

  const handleFetch = async () => {
    const userId = context.currentUser.id;
    const token = TokenService.getAuthToken();
    const preferences = await AuthApiService.getUserPreferences(userId, token);
    PetFinderApiService.fetchAnimals(preferences).then((data) => {
      setState({
        animals: data.animals,
        currentAnimal: data.animals[0],
        currentNumber: 0,
        totalAnimals: data.pagination,
      });
    });
    console.log(state.currentNumber);
  };

  const onInterestedClick = async () => {
    // add to pets
    await AnimalApiService.addAnimal(state.currentAnimal);
    // add to userPets as interested
    await UserPetApiService.addInterestedUserAnimal(
      context.currentUser.id,
      state.currentAnimal.id
    );
    //move to next animal
    setState({
      animals: state.animals,
      currentAnimal: state.animals[state.currentNumber + 1],
      currentNumber: (state.currentNumber += 1),
      totalAnimals: state.totalAnimals,
    });

    console.log(state.currentNumber);
    console.log(state.currentAnimal);
  };

  const onNotInterestedClick = async () => {
    //add to userPets as notInterested
    await UserPetApiService.addNotInterestedUserAnimal(
      context.currentUser.id,
      state.currentAnimal.id
    );
    setState({
      animals: state.animals,
      currentAnimal: state.animals[state.currentNumber + 1],
      currentNumber: (state.currentNumber += 1),
      totalAnimals: state.totalAnimals,
    });
  };

  if (state.totalAnimals === 0) {
    return (
      <>
        <div>...finding your potential pals, one sec...</div>{" "}
      </>
    );
  }

  return (
    <>
      <div className="home-main">
        <PreferenceNav handleFetch={handleFetch} />
        {state.totalAnimals.total_count === 0 ? (
          <div className="nothing-found">try a different combination</div>
        ) : (
          <div className="animal">
            <div className="swipe">
              <button className="swipe-btn" onClick={onNotInterestedClick}>
                <AiOutlineCloseCircle
                  size={70}
                  color="red"
                  className="no"
                ></AiOutlineCloseCircle>
              </button>

              <Animal currentAnimal={state.currentAnimal} />

              <button className="swipe-btn" onClick={onInterestedClick}>
                <AiOutlineCheckCircle
                  size={70}
                  color="green"
                  className="yes"
                ></AiOutlineCheckCircle>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

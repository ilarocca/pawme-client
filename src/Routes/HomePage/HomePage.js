import { useState, useEffect, useContext } from "react";
import TinderCard from "react-tinder-card";
import Loader from "react-loader-spinner";
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
    console.log(state.currentAnimal);
  });

  const handleFetch = async () => {
    const userId = context.currentUser.id;
    const token = TokenService.getAuthToken();
    const preferences = await AuthApiService.getUserPreferences(userId, token);
    const pals = await UserPetApiService.getUserAnimals(userId);

    PetFinderApiService.fetchAnimals(preferences).then((data) => {
      //filter through fetched animals
      //return array of animals that ids do not match userAnimals ids
      const newData = [];
      newData.animals = data.animals.filter(
        (animal) =>
          pals.all.find((pal) => pal.petId === animal.id) === undefined
      );
      newData.totalAnimals = newData.animals.length;

      setState({
        animals: newData.animals,
        currentAnimal: newData.animals[0],
        currentNumber: 0,
        totalAnimals: newData.totalAnimals,
      });
    });
  };

  const onSwipe = (direction) => {
    if (direction === "left") {
      onNotInterestedClick();
    } else if (direction === "right") {
      onInterestedClick();
    }
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };

  const onInterestedClick = async () => {
    // add to pets
    await AnimalApiService.addAnimal(state.currentAnimal);
    // add to userPets as interested
    await UserPetApiService.addInterestedUserAnimal(
      context.currentUser.id,
      state.currentAnimal.id
    );
    //move to next animal, update currentAnimal and totalAnimals
    setState((prevState) => {
      const newAnimals = prevState.animals.filter(
        (animal) => animal.id !== state.currentAnimal.id
      );
      return {
        animals: newAnimals,
        currentAnimal: newAnimals[0],
        currentNumber: 0,
        totalAnimals: newAnimals.length,
      };
    });
  };

  const onNotInterestedClick = async () => {
    //add to userPets as notInterested
    await UserPetApiService.addNotInterestedUserAnimal(
      context.currentUser.id,
      state.currentAnimal.id
    );
    setState((prevState) => {
      const newAnimals = prevState.animals.filter(
        (animal) => animal.id !== state.currentAnimal.id
      );
      return {
        animals: newAnimals,
        currentAnimal: newAnimals[0],
        currentNumber: 0,
        totalAnimals: newAnimals.length,
      };
    });
  };

  if (state.totalAnimals === 0) {
    return (
      <>
        <div className="loading">
          <Loader
            type="Hearts"
            className="hearts"
            color="#f14848"
            height={120}
            width={120}
          />{" "}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="home-main">
        <div className="home-pref">
          <PreferenceNav handleFetch={handleFetch} />
        </div>
        {state.totalAnimals === 0 ||
        state.currentNumber === state.totalAnimals ? (
          <div className="nothing-found">Try a different search</div>
        ) : (
          <div className="animal">
            <div className="swipe">
              <button className="swipe-btn-left" onClick={onNotInterestedClick}>
                Next
                <AiOutlineCloseCircle
                  size={28}
                  color="white"
                  className="no"
                ></AiOutlineCloseCircle>
              </button>

              <button className="swipe-btn-right" onClick={onInterestedClick}>
                Save
                <AiOutlineCheckCircle
                  size={28}
                  color="white"
                  className="yes"
                ></AiOutlineCheckCircle>
              </button>
            </div>

            <>
              {state.animals
                .slice(0)
                .reverse()
                .map((animal, index) => (
                  <TinderCard
                    key={index}
                    onSwipe={(dir) => onSwipe(dir)}
                    onCardLeftScreen={() => onCardLeftScreen(animal.name)}
                    preventSwipe={["up", "down"]}
                  >
                    <Animal currentAnimal={animal} />
                  </TinderCard>
                ))}
            </>
          </div>
        )}
      </div>
    </>
  );
}

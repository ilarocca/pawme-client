import { useState, useEffect, useContext } from "react";
import TinderCard from "react-tinder-card";
import Loader from "react-loader-spinner";
import "./HomePage.css";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import PetFinderApiService from "../../Services/petfinder-api-service";
import AuthContext from "../../Contexts/AuthContext";
import MainNav from "../../Routes/MainNav/MainNav";
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
    error: null,
    savingPal: false,
  });
  const context = useContext(AuthContext);

  useEffect(() => {
    if (state.totalAnimals === 0) {
      handleFetch();
    }
  });

  const handleFetch = async () => {
    const userId = context.currentUser.id;
    const token = TokenService.getAuthToken();
    const preferences = await AuthApiService.getUserPreferences(userId, token);
    const pals = await UserPetApiService.getUserAnimals(userId);

    if (preferences.distance !== "" && preferences.location === "") {
      setState({
        totalAnimals: null,
        error: "Please enter a location when entering a distance",
      });
      return;
    }

    PetFinderApiService.fetchAnimals(preferences).then((data) => {
      //filter through fetched animals
      //return array of animals that ids do not match userAnimals ids
      const newData = [];
      newData.animals = data.animals.filter(
        (animal) =>
          pals.all.find((pal) => pal.petId === animal.id) === undefined
      );
      newData.totalAnimals = newData.animals.length;

      if (newData.totalAnimals === 0) {
        setState({
          totalAnimals: null,
          error: "No results were found, please try a different combination.",
        });
      } else {
        setState({
          animals: newData.animals,
          currentAnimal: newData.animals[0],
          currentNumber: 0,
          totalAnimals: newData.totalAnimals,
          savingPal: false,
        });
      }
    });
  };

  const onSwipe = (direction) => {
    if (state.savingPal === true) {
      return;
    }
    if (direction === "left") {
      onNotInterestedClick();
    } else if (direction === "right") {
      onInterestedClick();
    }
  };

  const onInterestedClick = async () => {
    //prevents mutliple clicks, resulting in saving same animal multiple times
    setState({
      animals: state.animals,
      currentAnimal: state.currentAnimal,
      currentNumber: state.currentNumber,
      totalAnimals: state.totalAnimals,
      savingPal: true,
    });
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
        savingPal: false,
      };
    });
  };

  const onNotInterestedClick = async () => {
    //prevents mutliple clicks, resulting in saving same animal multiple times
    setState({
      animals: state.animals,
      currentAnimal: state.currentAnimal,
      currentNumber: state.currentNumber,
      totalAnimals: state.totalAnimals,
      savingPal: true,
    });
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
        savingPal: false,
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

  //renders main nav here to have access to handleFetch for mobile preference
  return (
    <>
      <MainNav handleFetch={handleFetch} />
      <div className="home-main">
        <div className="home-pref">
          <PreferenceNav handleFetch={handleFetch} />
        </div>
        {state.totalAnimals === 0 ||
        state.totalAnimals === null ||
        state.currentNumber === state.totalAnimals ? (
          <div className="nothing-found">{state.error}</div>
        ) : (
          <div className="animal">
            <div className="swipe">
              <button
                className="swipe-btn-left"
                disabled={state.savingPal === true}
                onClick={onNotInterestedClick}
              >
                Next
                <AiOutlineCloseCircle
                  size={28}
                  color="white"
                  className="no"
                ></AiOutlineCloseCircle>
              </button>

              <button
                className="swipe-btn-right"
                disabled={state.savingPal === true}
                onClick={onInterestedClick}
              >
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
                    preventSwipe={["up", "down"]}
                    flickOnSwipe={true}
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

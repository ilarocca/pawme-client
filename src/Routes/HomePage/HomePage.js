import { useState, useEffect, useContext } from "react";
import "./HomePage.css";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import PetApiService from "../../Services/pet-api-service";
import AuthContext from "../../Contexts/AuthContext";
import PreferenceNav from "../../Components/PreferenceNav/PreferenceNav";
import Animal from "../../Components/Animal/Animal";
import QueryNav from "../../Components/QueryNav/QueryNav";

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

  const handleFetch = () => {
    PetApiService.fetchAnimals(context.userPreferences).then((data) => {
      setState({
        animals: data.animals,
        currentAnimal: data.animals[0],
        currentNumber: 0,
        totalAnimals: data.pagination,
      });
    });
  };

  const onClick = () => {
    setState({
      animals: state.animals,
      currentAnimal: state.animals[state.currentNumber++],
      currentNumber: state.currentNumber++,
      totalAnimals: state.totalAnimals,
    });
    console.log(state.currentNumber);
    console.log(state.currentAnimal);
  };

  if (state.totalAnimals === 0) {
    return (
      <>
        <PreferenceNav />
      </>
    );
  }

  return (
    <>
      <PreferenceNav />
      <div className="home-main">
        <QueryNav />
        <div className="animal">
          <Animal currentAnimal={state.currentAnimal} />
          <div className="swipe">
            <button className="swipe-btn" onClick={onClick}>
              <AiOutlineCloseCircle
                size={70}
                color="red"
                className="no"
              ></AiOutlineCloseCircle>
            </button>
            <button className="swipe-btn" onClick={onClick}>
              <AiOutlineCheckCircle
                size={70}
                color="green"
                className="yes"
              ></AiOutlineCheckCircle>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

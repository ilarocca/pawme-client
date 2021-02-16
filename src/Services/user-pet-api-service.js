import config from "../config";
import TokenService from "./TokenService";

const UserPetApiService = {
  async addInterestedUserAnimal(userId, petId) {
    const userPet = { userId, petId, interested: true };
    console.log(userPet);
    const res = await fetch(
      `${config.API_ENDPOINT}/users/${userId}/animals/${petId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify(userPet),
      }
    );
    if (!res.ok) {
      return res.json().then((e) => Promise.reject(e));
    }
    return res.json();
  },

  async addNotInterestedUserAnimal(userId, petId) {
    const userPet = { userId, petId, interested: false };
    const res = await fetch(
      `${config.API_ENDPOINT}/users/${userId}/animals/${petId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify(userPet),
      }
    );
    if (!res.ok) {
      return res.json().then((e) => Promise.reject(e));
    }
    return res.json();
  },

  async getUserAnimals(userId) {
    const res = await fetch(`${config.API_ENDPOINT}/users/${userId}/animals`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    });
    if (!res.ok) {
      return res.json().then((e) => Promise.reject(e));
    }
    return res.json();
  },

  async deleteUserAnimal(userId, petId) {
    const res = await fetch(
      `${config.API_ENDPOINT}/users/${userId}/animals/${petId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TokenService.getAuthToken()}`,
        },
      }
    );
    if (!res.ok) {
      return res.json().then((e) => Promise.reject(e));
    }
    return res;
  },
};

export default UserPetApiService;

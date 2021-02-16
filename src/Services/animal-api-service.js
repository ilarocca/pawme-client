import config from "../config";
import TokenService from "./TokenService";

const AnimalApiService = {
  async addAnimal(currentAnimal) {
    const { id, name, contact, age, url, photos, description } = currentAnimal;
    //work around to see if there is a even photo first before grabbing it's size
    let image = "";
    if (!photos[0]) {
      image = undefined;
    } else {
      image = photos[0].full;
    }
    const newAnimal = {
      petId: id,
      name,
      email: contact.email,
      phone: contact.phone,
      location: contact.address.city + ", " + contact.address.state,
      age,
      url,
      description,
    };
    //add photo to objecT
    newAnimal.img = image;
    console.log(newAnimal);
    const res = await fetch(`${config.API_ENDPOINT}/animals/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newAnimal),
    });
    if (!res.ok) {
      return res.json().then((e) => Promise.reject(e));
    }
    return res.json();
  },
};

export default AnimalApiService;

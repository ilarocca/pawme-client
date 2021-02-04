require("dotenv").config();

const PetApiService = {
  fetchAnimals(preferences) {
    console.log(preferences);
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiSecret = process.env.REACT_APP_API_SECRET;

    const newAnimals = fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: "POST",
      body:
        "grant_type=client_credentials&client_id=" +
        apiKey +
        "&client_secret=" +
        apiSecret,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const proxy = "https://calm-badlands-65255.herokuapp.com/";

        //creates query string based on preferences.
        //if perferences are null or empty, will return empty string to fetch request
        let queryString = "";
        for (const [key, value] of Object.entries(preferences)) {
          if (value === "" || value === null || key === "user_id") {
          } else {
            queryString += key + "=" + value + "&";
          }
        }
        console.log(queryString);

        return fetch(
          `${proxy}https://api.petfinder.com/v2/animals?limit=100&${queryString}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          }
        );
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log("something went wrong", err);
      });
    return newAnimals;
  },
};

export default PetApiService;

require("dotenv").config();

const PetFinderApiService = {
  fetchCoordinates(preferences) {
    const locationApiKey = "pk.dfa455516566d01d6ae4e224e5d27410";
    const locationBaseUrl = "https://us1.locationiq.com/v1/search.php";
    const params = {
      key: locationApiKey,
      q: preferences.location,
      countrycodes: "us",
      limit: 1,
      format: "json",
    };
    function formatQueryParams(params) {
      const queryItems = Object.keys(params).map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      );

      return queryItems.join("&");
    }

    const queryString = formatQueryParams(params);
    const url = locationBaseUrl + "?" + queryString;

    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          throw new Error("Location Not Found");
        } else {
          throw new Error("Please Try Again Later");
        }
      })
      .then((resJson) => {
        return resJson;
      })
      .catch((err) => {
        throw err;
      });
  },

  async fetchAnimals(preferences) {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiSecret = process.env.REACT_APP_API_SECRET;

    let newLocation = "";
    if (preferences.location !== "") {
      let locationRes = await this.fetchCoordinates(preferences).then((res) => {
        return res;
      });
      newLocation = locationRes[0].lat + "," + locationRes[0].lon;
    }
    preferences.location = newLocation;

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
          if (
            value === "" ||
            value === null ||
            key === "user_id" ||
            value === false
          ) {
          } else {
            queryString += key + "=" + value + "&";
          }
        }

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
        return err;
      });
    return newAnimals;
  },
};

export default PetFinderApiService;

import config from "../config.json";

// TODO: Need to fix the backend name below with the correct environment...
const BASE_URL = config["GGS-backend-test"].GGSclientAPIendpoint;

export function getLocations(email) {
  return fetch(BASE_URL + "locations", {
    method: "GET",
    headers: {
      GGSUnit: email,
    },
  })
    .then((data) => data.json())
    .catch((err) => {
      console.error(err);
    });
}

export function collectLocation(email, id) {
  return fetch(BASE_URL + "unit/collect", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      GGSUnit: email,
    },
    body: JSON.stringify({ id })
  }).catch((err) => {
    console.error(err);
  });
}

import config from "../config.json";

export function getLocations(email) {
  const BASE_URL = config["GGS-backend-test"].GGSclientAPIendpoint;

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
  const BASE_URL = config["GGS-backend-test"].GGSclientAPIendpoint;

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

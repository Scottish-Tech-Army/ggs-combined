import { readConfig } from '../configReader.js';

const BASE_URL = readConfig('GGSclientAPIendpoint');

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

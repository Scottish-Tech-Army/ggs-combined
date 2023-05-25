import { readConfig } from '../configReader.js';

const BASE_URL = readConfig('GGSclientAPIendpoint');

export function getLeaderboard(email) {
  return fetch(BASE_URL + "unit/leaderboard", {
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

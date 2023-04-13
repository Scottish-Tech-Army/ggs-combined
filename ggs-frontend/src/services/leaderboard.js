import config from "../config.json";

export function getLeaderboard(email) {
  // TODO: Need to fix the backend name below with the correct environment...
  const BASE_URL = config["GGS-backend-test"].GGSclientAPIendpoint;

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

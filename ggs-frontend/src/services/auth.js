import config from "../config.json";

export function login(email) {
  // TODO: Need to fix the backend name below with the correct environment...
  const BASE_URL = config["GGS-backend-test"].GGSclientAPIendpoint;

  return fetch(BASE_URL + "unit/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  })
}

export function register(email, name) {
  // TODO: Need to fix the backend name below with the correct environment...
  const BASE_URL = config["GGS-backend-test"].GGSclientAPIendpoint;

  return fetch(BASE_URL + "unit/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name }),
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  })
}

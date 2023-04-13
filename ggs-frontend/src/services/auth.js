import config from "../config.json";

export function login(email) {
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

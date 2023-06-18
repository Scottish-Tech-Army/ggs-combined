import { readConfig } from '../configReader.js';

const BASE_URL = readConfig('GGSclientAPIendpoint');


// Component <ChallengesNearMe/> imports 
// the following function. 
// This function demands from the backend 
// an array containing 486 objects, each 
// representing a location: 
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







// Component <LocationModal/> imports the following 
// function.
// This function tells the backend to mark a
// location as having been collected.
// The argument id in this function is the 
// id of a location.
// Every member object of the locations 
// array has a locationId property. This 
// gets passed in to this function when 
// <LocationModal/> calls this function: 
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

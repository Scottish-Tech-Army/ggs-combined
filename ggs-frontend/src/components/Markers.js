import React from "react";
import Pin from "./Pin";
import { Marker } from "react-map-gl";

const Markers = ({
  locations,
  setSelectedLocation,
}) => {


  return (
    // Remember that locations is an array each member of which is an
    // object that represents a location and has many properties, such as 
    // latitutde and longitude: 
    locations &&
    locations.map((location, index) => (
      // Make a <Marker/> for each location, each with the correct 
      // lat & long, each having an onClick handler that changes 
      // <ChallengesNearMePage/>'s state property selectedLocation 
      <Marker
        key={index}
        index={index}
        marker={location}
        latitude={location.latitude}
        longitude={location.longitude}
        onClick={() => setSelectedLocation(location)}
      >
        <Pin
          location={location} // dynamically apply colour without triggering rerenders (Mukund: what??)
        />
      </Marker>
    ))
  );
};

export default Markers;

import React, { useContext, useEffect, useState } from "react";


// Bootstrap stuff:
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

// Other stuff:
import { collectLocation } from "../services/locations";
import { authContext } from "../contexts/AuthContext";


// Images:
import placeholderPhoto from "../assets/images/noImageYet.svg";
import xPrimary from "./x-primary.svg";
import dividerLine from "./divider-line.svg";



// Change this as needed for coordinate distance from landmark.
const LOCATION_TOLERANCE_LATITUDE = 0.0002; // Note 0.0002 is approx equal to 22 metres.
const LOCATION_TOLERANCE_LONGITUDE = 0.0004; // Note 0.0004 is approx equal to 24 metres.

const isLocationInRange = (location, userLatLong) => {
  return (
    Math.abs(location.latitude - userLatLong.latitude) <= LOCATION_TOLERANCE_LATITUDE &&
    Math.abs(location.longitude - userLatLong.longitude) <= LOCATION_TOLERANCE_LONGITUDE
  );
};

const LocationModal = ({
  selectedLocation,
  handleCloseLocation,
  setLocations,
  userLatLong,
}) => {
  const { unit } = useContext(authContext);

  const [isOutOfRange, setIsOutOfRange] = useState(true);
  const [deviceErrMsg, setDeviceErrMsg] = useState();


// A state property that is a boolean. Its value determines
// whether or not the "Congratulations! ..." message will 
// appear in this modal. When the user clicks the button
// that allows her to collect a location the click handler
// for that button sets this state property to true,
// causing conditional rendering of the "Congratulations! ..."
// message:
  const [showCongrats, setShowCongrats] = useState(false);

  const handleCollectLocation = (event) => {
    // The following function tells the backend that the 
    // user has collected the location of the given id:
    collectLocation(unit.email, selectedLocation.locationId)
      .then((response) => {
        if (response.ok) {
          // Update the frontend locations with the 
          // collected marker to match the backend status.
          // The following function simply sets to true the 
          // collected property of the object (a member of 
          // array locations) that corresponds to
          // the location in question: 
          setLocations((locations) => {
            const index = locations.findIndex(
              (i) => i.locationId === selectedLocation.locationId
            );
            const locationList = [...locations];
            locationList[index].collected = true;
            return locationList;
          });
          // Also set state property showCongrats to true
          // so that the "Congratulations! ..." message 
          // shows:
          setShowCongrats(true)
                         }
      })
      .catch((error) => {
        console.error(error);
      });
    event.preventDefault();
  };

// set a variable to the jsx for the "Congratulations! ... " text:
let congratsMessage = (   
<> 
<h1>Congratulations!</h1>
  <div>
    <p>You have collected this location:</p>
  </div>
</>
                   )



  // Set a variable to the object that is in array photos, which is a property of 
  // object selectedLocation. array photos looks like this
  // (it contains only one object):
  // [{url:  "https://dz1ex1yb0vxyz.cloudfront.net/dunbartonshire-bearsden-thegruffalotrail.jpg"}]
    const photo = selectedLocation.photos[0];



// The following useEffect either 
// 1) if location tracking is not on:
//    sets the error message, 
//    sets boolean state property isOutOfRange to true
// 2) if location tracking IS on:
//    finds out whether the user is in range or out of range
//    and sets boolean state property isOutOfRange accordingly.
// The useEffect runs whenever the user moves (which changes 
// userLatLong) or whenever the user clicks on a new marker
// (which changes selectedLocation)
  useEffect(() => {
    if (!userLatLong) { // 1):
      setDeviceErrMsg("Please turn on location tracking");
      setIsOutOfRange(true);
    } else {  // 2):
      setIsOutOfRange(!isLocationInRange(selectedLocation, userLatLong));
    }
  }, [selectedLocation, userLatLong]);

  
  
  // Adapt the collecting button depending on user's proximity to the landmark location
  // and the collection status of the landmark location.
  // selectedLocation.collected and isOutOfRange are booleans.
  const collectButtonDisabled = selectedLocation.collected || isOutOfRange;
  const collectButtonText = isOutOfRange ? "Please come closer to this location" : "Tap to reveal challenge";

  const areaName =
    selectedLocation.city && selectedLocation.city !== selectedLocation.county
      ? `${selectedLocation.city}, ${selectedLocation.county}`
      : selectedLocation.county;


  function getPhoto(photo) {
    if (!photo) {
      return (
// If there's no photo available shove this into the
// <Modal.Body/>:
        <>
          <Image
            className="img-location"
            src={placeholderPhoto}
            alt="no image available"
            rounded
          />
          <div className="challenge">
            <h2>Bonus Challenge</h2>
            <div className="content">
              Will you be the first to take a picture of this location? Take a
              photo and send it to us at{" "}
              <a href="mailto:web@girlguiding-scot.org.uk">
                web@girlguiding-scot.org.uk
              </a>
            </div>
          </div>
        </>
      );
                 } // end if there's no photo

// Set creditLine to some jsx that contains info about the photo:
    let creditLine = null;
    if (photo.attribution || photo.copyright) {
      let attributionElement = photo.originalUrl ? (
        <a href={photo.originalUrl} target="_blank" rel="noreferrer">
          {photo.attribution} {photo.copyright}
        </a>
      ) : (
        <>
          {photo.attribution} {photo.copyright}
        </>
      );
      creditLine = (
        <div className="img-location-credit">Credit: {attributionElement}</div>
      );
    }


    // If there IS a photo available shove this into the
// <Modal.Body/>:
    return (
      <>
        <Image
          className="img-location"
          src={photo.url}
          alt={selectedLocation.name}
          rounded
        />
        {creditLine}
      </>
          );
                        } // end getPhoto




  return (
    <Modal
      show={true}
      onHide={handleCloseLocation}
      key={selectedLocation.locationId}
      className="custom-modal location-modal"
    >
      <Modal.Header className="border-0 mb-n4">

        {/*The button the user clicks to close the modal. It has an X image in it: */} 
        <Button
          variant="outline-primary"
          onClick={handleCloseLocation}
          className="closer-position"
          aria-label="Close"
        >
          <img
            src={xPrimary}
            style={{ width: "200%", height: "200%" }}
            alt=""
          />
        </Button>
      </Modal.Header>

      <Modal.Body className="mt-n3">
        {/*If the user has clicked the button that reads "Tap to reveal challenge"
        show the "Congratulations! ... " message: */} 
      {showCongrats ? congratsMessage : null} 
        <div className="place-name">{selectedLocation.name}</div>
        <div className="city-name">{areaName}</div>
        <div className="scroll-container">
          <div className="scroll">
            {getPhoto(photo)}
            <div className="description">{selectedLocation.description}</div>
            {selectedLocation.collected && (
              <div className="challenge">
                <h2>Challenge</h2>
                <div className="content">{selectedLocation.challenge}</div>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
      {/*If there's an error show the error message: */}
      {!!deviceErrMsg && (
        <div className="container">
          <img src={dividerLine} style={{ width: "100%" }} alt="" />
          <p className="feedback-branding">{deviceErrMsg}</p>
        </div>
      )}
      {/*If there's no error and the user has NOT collected 
      the location, show the button that allows the user to 
      collect the location: */}
      {!selectedLocation.collected && !deviceErrMsg && (
        <Button
          bsPrefix="btn-branding"
          // The following function tells the backend 
          // to mark the location in question as
          // collected. It also gets the object in 
          // array locations (here in the frontend) 
          // that corresponds to the location and sets 
          // its collected property to true:
          onClick={handleCollectLocation}
          disabled={collectButtonDisabled}
          className={
            collectButtonDisabled
              ? "btn-branding-disabled mx-2 mb-2"
              : "btn-branding-enabled mx-2 mb-2"
          }
        >
          {collectButtonText}
        </Button>
      )}
    </Modal>
  );
};

export default LocationModal;

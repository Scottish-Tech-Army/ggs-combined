import React, { useEffect, useState, useContext, useRef } from "react";

// Modal pop-ups:
import LocationModal from "./LocationModal";
import GeolocErrorModal from "./GeolocErrorModal";

// Stuff do do with ReactMapGL:
import Markers from "./Markers";
import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";


// Other stuff
import { getLocations } from "../services/locations";

// Other components:
import NavigationBar from "./NavigationBar.js";

// context
// Consume the context that gets made available to this
// component from <MenuContext/> 
import {MenuContext} from "./Home.js"
// Consume the context that gets made available to this
// component from <AuthContext/>
import { authContext } from "../contexts/AuthContext";



// css stuff:
import "mapbox-gl/dist/mapbox-gl.css";


/*
HOW THIS PAGE WORKS
-------------------



*/








// Start app centred on Old College, Edinburgh
const START_LOCATION = { latitude: 55.9472096, longitude: -3.1892527 };

const OPENSTREETMAP_MAPSTYLE = {
  version: 8,
  sources: {
    "raster-tiles": {
      type: "raster",
      tiles: [
        "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: "osm-tiles",
      type: "raster",
      source: "raster-tiles",
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};






const MAPBOX_MAPSTYLE = "mapbox://styles/mapbox/streets-v11";




export default function ChallengesNearMePage({
    isThisPageActive
                                            })
                                            {


    // Mukund: Get the unit object from <AuthContext>:
    const { unit } = useContext(authContext);


    // Consume the big object
    const bigIconsObject = useContext(MenuContext);

    

// A boolean state property. Code changes this
// so that the error modal shows (eg when the 
// user has blocked location services) or does 
// not:
const [showGeolocErrorModal, setShowGeolocErrorModal] = useState(false);

// A boolean state property. Code changes this
// so that the error modal shows (eg when the 
// user has blocked location services) or does 
// not:
const [locationServicesOffFlag, setLocationServicesOffFlag] = useState(false);





    // Mukund: To get a reference to component <ReactGraphGl/>
    // so that you can access all of the component's functions
    // do this:   
    // const mapRef = useRef();
    // mapRef.current.*nameOfFunction()*.
    // See https://docs.mapbox.com/mapbox-gl-js/api/map/ for list of MapBox's Map functions: 
    
    const mapRef = useRef();



//---------------------------------------
// A ref to hold lat and long data of the mobile:
const positionCoords = useRef()



// a function that is passed in to 
// <GeolocErrorModal> as props 
// that makes the modal go away.
// This function must:
// 1) set to false  
function handleClose(){
// 1):
  setShowGeolocErrorModal(false)
                      }




/* OLD CODE REMOVE EVENTUALLY:
// The click event handler for the button.
// This function must
// 1) determine whether the user has set her 
// browser so that it allows apps to 
// determine the user's location
// 2) show the error modal if the user has 
// not set that browser setting:
*/

// This function has to run when the 
// user visits the page and must
// 1) determine whether the user has set her 
// browser so that it allows apps to 
// determine the user's location
// 2) show the error modal if the user has 
// not set that browser setting::
/*
    const runFlyToOnce = () =>{
// 1):       
 if (userLatLong !== undefined) {
    mapRef.current.flyTo({
    center: [userLatLong.longitude, userLatLong.latitude],
    duration: 2000,
                         });
                                } else {
// 2):
setShowGeolocErrorModal(true)
                                       }
                              }
*/

const runFlyToOnce = () =>{
// 1):       
// if (userLatLong !== undefined) {
  if (positionCoords.current !== undefined) {  
    mapRef.current.flyTo({
    center: [positionCoords.current.longitude, positionCoords.current.latitude],
    duration: 2000,
                         });
                               }  else {
                                // 2):
                                console.log(`Inside runFlyToOnce and positionCoords.current is ${positionCoords.current}`)
                                setShowGeolocErrorModal(true)
                                       }
                          }





// This function gets called from inside the 
// conditional logic that shows this page or not.
// This function must:
// 1) if location services is set in the browser
// return true and get the map to fly to the 
// user's location
// 2) if location services is NOT set in the browser
// take action to make the condional rendering logic
// show the error modal (simply return false):
function isBrowserLocationServicesSet () {
  console.log(`Function isBrowserLocationServicesSet has been called`)
// 1):
  if (userLatLong !== undefined) {
    return true                     
                                 }
// 2):
    return false                               
                                         }

                                        



// Get the locations collection
const [locations, setLocations] = useState([]);


// When <AuthProvider/>'s state property unit changes, 
// getLocations() asks the backend for the locations 
// array associated with this unit (or user):
useEffect(() => {
  if (unit) {

    // locations is a state property that is an array 
    
    getLocations(unit.email).then(setLocations);
    // 30 Mar23: Mukund added the following two lines for testing only:
    let locationsData = JSON.stringify(locations)
    // console.log(`Inside useEffect inside <ChallengesNearMe/> and locations is: ` + locationsData)
    console.log(`Inside useEffect inside unit.email is: ${unit.email}`)
  } else {
    // setShowLogin(true);
  }
}, [unit]);






// state property to hold the lat and long
// coords of the user.
const [userLatLong, setUserLatLong] = useState();

const navControlStyle = { right: 10, top: 10 };
const geolocateControlStyle = { left: 15, top: 55 };

// On startup of the app do this:
// 1) set some options and callbacks for function navigator.geolocation.getCurrentPosition()
// 2) Get the lat and long of the user
useEffect(() => {
  // 1):
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(position) {
    positionCoords.current = position.coords
        // setUserLatLong(position.coords);
        // console.log(`In the success function. positionCoords.current.latitude is ${positionCoords.current.latitude} and mapRef.current is ${mapRef.current}`)

    // mapRef.current &&
    
      mapRef.current.flyTo({
        // center: [position.coords.longitude, position.coords.latitude],
         center: [positionCoords.current.longitude, positionCoords.current.latitude],
        duration: 2000,
      });

    
                              }


  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
         console.warn("User denied the request for Geolocation.");
         setShowGeolocErrorModal(true)
         setLocationServicesOffFlag(true)
        break;
      case error.POSITION_UNAVAILABLE:
         console.warn("Location information is unavailable.");
         setShowGeolocErrorModal(true)
         setLocationServicesOffFlag(true)
        break;
      case error.TIMEOUT:
         console.warn("The request to get user location timed out.");
         setShowGeolocErrorModal(true)
         setLocationServicesOffFlag(true)
        break;
      default:
         console.error("An unknown error occurred.", error);
         setShowGeolocErrorModal(true)
         setLocationServicesOffFlag(true)
        break;
    }
  }

// 2):   
  navigator.geolocation.getCurrentPosition(success, showError, options);
// 3):
  // runFlyToOnce()

}, []); // When 2nd arg is empty array -> run this useEffect() only once, after the first 
// render of the component (ie the execution of the component function)


// Loading-graphic controls
const [showLoading, setShowLoading] = useState(false);
const [loadingText, setLoadingText] = useState("Working"); // default message
const [loadingTimer, setLoadingTimer] = useState(10000);
// default display time set long because used when disconnect experienced
// passing a long time to setLoadingTimer within handleDelay
// was failing despite console.logs within the Loading component picking
// up the updated loading time
useEffect(() => {
  if (unit && !locations) {
    setLoadingText("Landmarks unavailable");
    setShowLoading(true);
  } else {
    setTimeout(setShowLoading, loadingTimer, false);
  }
}, [locations, unit, loadingTimer]);


// Retrieve modal data for selected pin
const [selectedLocation, setSelectedLocation] = useState();

const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const mapStyle = mapboxAccessToken ? MAPBOX_MAPSTYLE : OPENSTREETMAP_MAPSTYLE;

console.log(
  mapboxAccessToken
    ? `Using Mapbox with access token ${mapboxAccessToken}`
    : "Using OpenStreetMap"
);




// ------------------- Now the actual rendering -------------------



let showModal = < GeolocErrorModal 
errorMessage = {
`This app cannot tell where you are. Change 
the setting in your browser that will allow 
this app to locate you.`
               }
handleClose =  {handleClose} 
                />


// Define the variable whose value 
// will be either 
// i)  a load of JSX that describes the page
// ii) null 
let renderThis
let renderTheMapAndStuff

// Now conditionally set renderThis 
// depending on the value of prop 
// isThisPageActive:

// if (isThisPageActive) {

  
// If parent component <Home/> has set this 
// component's prop isThisPageActive to 
// true, render the ChallengesNearMe page:
// renderThis = renderTheMapAndStuff

/*
// Determine whether the user has set her browser to
// allow location services and render accordingly:
if (isBrowserLocationServicesSet()){    
  renderThis = renderTheMapAndStuff
  
                                   } else {
  renderThis = showModal
                                          }
*/

// renderTheMapAndStuff = (
  renderThis = (
<div className={isThisPageActive ? "challengesNearMeOuterContainerShow" : "challengesNearMeOuterContainerHide"}>


{/* The button that reads "Click for your map".
This is now no longer necessary.
Remove eventally:

<GGSbuttonOne
 buttonDivCSSclass = {"largeButton1New positionButton"}
 pTextCSSclass = {"buttonOperable"}
 clickHandler = {()=>{runFlyToOnce()}}
 pText = {"Tap here for your map"}
/>
*/}

{/*The following line is necessary because the modal's Close button sets 
showGeolocErrorModal to false, closing the modal and allowing the user
once again to click on the home icon or icons in the plus menu. When the
user goes to another page and comes back showGeolocErrorModal must be
true again to show the error modal: */}
{/* 
{(!isThisPageActive && !showGeolocErrorModal) ? (setShowGeolocErrorModal(true)) : (setShowGeolocErrorModal(false))}
*/}

{(!isThisPageActive && !showGeolocErrorModal) ? (setShowGeolocErrorModal(true)) : null}

{(isThisPageActive && showGeolocErrorModal && locationServicesOffFlag) ? showModal : <></>}

  <div
      className="container-fluid"
      style={{ paddingLeft: "0px", paddingRight: "0px" }}
      >

<ReactMapGL
        ref={mapRef}
        style={{ height: "100vh", width: "100vw"  }}
        initialViewState={{
          latitude: START_LOCATION.latitude,
          longitude: START_LOCATION.longitude,
          zoom: 14,
        }}
        mapStyle={mapStyle}
        mapboxAccessToken={mapboxAccessToken}
      >
        <Markers
          locations={locations}
          setSelectedLocation={setSelectedLocation}
        />
        <NavigationControl style={navControlStyle} showCompass={true} />
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserHeading={true}
          onGeolocate={({ coords }) => setUserLatLong(coords)}
          auto
        />
</ReactMapGL>
      {selectedLocation && (
        <LocationModal
          handleCloseLocation={() => setSelectedLocation(undefined)}
          selectedLocation={selectedLocation}
          setLocations={setLocations}
          userLatLong={userLatLong}
        />
      )}



{/* The navigation bar at the bottom of the page,
 which includes the home button and plus button)*/}
<NavigationBar iconsObject = {bigIconsObject.p2}/>


</div>
</div>
             ) 
                          
//                      } // end if (isThisPageActive)


/*
// If parent component <Home/> 
// has set prop isThisPageActive to  
// false, don't render anything:
if (!isThisPageActive) {
    renderThis = null
                       } // end if
*/
    

    return (
<div>
{renderThis}
</div>
           )


} // end ChallengesNearMePage

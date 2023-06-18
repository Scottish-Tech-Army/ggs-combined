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
// const START_LOCATION = { latitude: 55.9472096, longitude: -3.1892527 };
let START_LOCATION = { latitude: 55.9472096, longitude: -3.1892527 };



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


    // Get the unit object from <AuthContext>:
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
// not show:
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
// 1) set showGeolocErrorModal to false  
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

/*
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
*/



/*OLD CODE -- REMOVE EVENTUALLY
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
*/
                                        



// Get the locations collection
const [locations, setLocations] = useState([]);


// When <AuthProvider/>'s state property unit changes, 
// getLocations() asks the backend for the locations 
// array associated with this unit (or user):
useEffect(() => {
  if (unit) {

    // State property locations is an array 
    // that contains 486 objects, each 
    // representing a location. 
    // getLocations(unit.email) uses fetch(), 
    // which returns a Promise.
    // More accurately this is what occurs:
    // 1) getLocations uses fetch(), which 
    //    returns a Response object (called 
    //    data in our code),
    // 2) this function acts on data: 
    //    .then((data) => data.json())
    // 3) the .json() function returns a Promise:
    getLocations(unit.email).then(setLocations);
    
    // let locationsData = JSON.stringify(locations)
    // console.log(`Inside useEffect inside <ChallengesNearMe/> and locations is: ` + locationsData)
   // console.log(`Inside useEffect inside unit.email is: ${unit.email}`)
  } else {
    // setShowLogin(true);
  }
}, [unit]);





// The following line is necessary for when the browser's location 
// services facility is off, which makes the error modal show. 
// The modal's Close button sets showGeolocErrorModal to 
// false, closes the modal and allows the user once again to click
// on the home icon or icons in the plus menu. When the user goes 
// to another page and comes back showGeolocErrorModal must be
// true again to show the error modal. This useEffect makes that 
// happen:
useEffect(() => {
  if (!isThisPageActive && !showGeolocErrorModal  ){
    setShowGeolocErrorModal(true)
                                                   } 
                }, [isThisPageActive]); // this useEffect only runs when isThisPageActive changes,
                                        // ie every time the user leaves and comes back to this page.  







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
    // positionCoords.current = position.coords
    setShowGeolocErrorModal(false)
    setLocationServicesOffFlag(false)
    // When the component for this page first runs 
    // START_LOCATION must contain the lat and long of
    // the user's position: 
    START_LOCATION = { latitude: position.coords.latitude, longitude: position.coords.longitude }
    console.log(`***In success fn. Your browser says your lat and long are: ${START_LOCATION.latitude} and ${START_LOCATION.longitude}`)

    // mapRef.current &&
    /*
      mapRef.current.flyTo({
        // center: [position.coords.longitude, position.coords.latitude],
         center: [positionCoords.current.longitude, positionCoords.current.latitude],
        duration: 2000,
      });
      */
    
                              }


  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
         console.warn("User denied the request for Geolocation.");
         setShowGeolocErrorModal(true)
         setLocationServicesOffFlag(true)
         START_LOCATION = { latitude: 55.9472096, longitude: -3.1892527 } // Edinburgh
        break;
      case error.POSITION_UNAVAILABLE:
         console.warn("Location information is unavailable.");
         setShowGeolocErrorModal(true)
         setLocationServicesOffFlag(true)
         START_LOCATION = { latitude: 55.9472096, longitude: -3.1892527 } // Edinburgh
        break;
      case error.TIMEOUT:
         console.warn("The request to get user location timed out.");
         setShowGeolocErrorModal(true)
         setLocationServicesOffFlag(true)
         START_LOCATION = { latitude: 55.9472096, longitude: -3.1892527 } // Edinburgh
        break;
      default:
         console.error("An unknown error occurred.", error);
         setShowGeolocErrorModal(true)
         setLocationServicesOffFlag(true)
         START_LOCATION = { latitude: 55.9472096, longitude: -3.1892527 } // Edinburgh
        break;
    }
  }

// 2):   
  navigator.geolocation.getCurrentPosition(success, showError, options);
// 3):
  // runFlyToOnce()

}, []); // this useEffect() runs only once, after the first 
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





// The onClick handler for each <Marker/> sets this state property
// to an object that represents the location that that <Marker/> 
// represents. The object has various properties, including latitude 
// and longitude. :
const [selectedLocation, setSelectedLocation] = useState();






const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const mapStyle = mapboxAccessToken ? MAPBOX_MAPSTYLE : OPENSTREETMAP_MAPSTYLE;

console.log(
  mapboxAccessToken
    ? `Using Mapbox with access token ${mapboxAccessToken}`
    : "Using OpenStreetMap"
);


// A test function. This gets called by
// the onGelocate event handler of 
// <GeolocateControl/> (that event 
// firing when the user clicks the button
// in the top right of the screen):
function testSetUserLatLong(coordsArg){
  setUserLatLong(coordsArg)
  // console.log(`***In the fn called by <GeolocateControl/>. coordsArg is ${coordsArg}`)
                                      }




// ------------------- Now the actual rendering -------------------


// a var to hold the jsx for the modal that 
// shows if the user's browser does not have
// location services turned on:
let showModal = < GeolocErrorModal 
errorMessage = {
`This app cannot tell where you are. Change 
the setting in your browser that will allow 
this app to locate you.`
               }
handleClose =  {handleClose} 
                />


// Declare the variable whose value 
// will be either 
// i)  a load of JSX that describes the page
// ii) null 
let renderThis

// Now conditionally set renderThis 
// depending on the value of prop 
// isThisPageActive:

if (isThisPageActive) {

  
// If parent component <Home/> has set this 
// component's prop isThisPageActive to 
// true, render the ChallengesNearMe page:


  renderThis = (
<div className="challengesNearMeOuterContainerShow">

{/*The following line is necessary because the modal's Close button sets 
showGeolocErrorModal to false, closing the modal and allowing the user
once again to click on the home icon or icons in the plus menu. When the
user goes to another page and comes back showGeolocErrorModal must be
true again to show the error modal: */}
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
        {/* Pass in to <Markers/> two things: 1) the array containing all 486 objects 
        that represent the locations and 2) the function that sets state property
        selectedLocation:*/}
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
          // onGeolocate={({ coords }) => setUserLatLong(coords)}
          onGeolocate={({ coords }) => testSetUserLatLong(coords)}
          auto
        />
</ReactMapGL>
{/* Only show the location modal when selectedLocation is truthy, 
ie when it contains an object representing a location (which 
it will when the user clicks a <Marker/>:*/}
      {selectedLocation && (
        <LocationModal
          handleCloseLocation={() => setSelectedLocation(undefined)}
          selectedLocation={selectedLocation}
          setLocations={setLocations}
          userLatLong={userLatLong}
        />
      )}



{/* The navigation bar at the bottom of the page,
 which includes the home button and plus button): */}
<NavigationBar iconsObject = {bigIconsObject.p2}/>


</div>
</div>
             ) 
                          
                      } // end if (isThisPageActive)



// If parent component <Home/> 
// has set prop isThisPageActive to  
// false, don't render anything:
if (!isThisPageActive) {
    renderThis = null
                       } // end if
/**/
    

    return (
<div>
{renderThis}
</div>
           )


} // end ChallengesNearMePage

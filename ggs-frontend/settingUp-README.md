<div id="top"></div>
<!--
*** This README is adapted from the Best-README-Template by othneildrew.
*** @ https://github.com/othneildrew/Best-README-Template
-->

<!-- PROJECT SHIELDS -->
<!--
*** Note from the original template author:
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Scottish-Tech-Army/ggs-frontend">
    <img src="src/assets/images/gg-logo.png" alt="Logo" width="auto" height="80">
  </a>

<h3 align="center">Girlguiding Scotland treasure hunt</h3>

  <p align="center">
    This is a mobile web app that allows users to go on a treasure hunt of Scottish landmarks. Girlguide units can compete with other units across the organisation.
    <br />
    <a href="https://github.com/Scottish-Tech-Army/ggs-frontend"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Scottish-Tech-Army/ggs-frontend">View Demo</a>
    ·
    <a href="https://github.com/Scottish-Tech-Army/ggs-frontend/issues">Report Bug</a>
    ·
    <a href="https://github.com/Scottish-Tech-Army/ggs-frontend/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
 <summary>Table of Contents</summary>

  <ol>
    <li>
      <a href="#about-the-project">About the project</a>
      <ul>
        <li><a href="#built-with">Built with</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#use">Use</a></li>
    <!-- <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li> -->
        <li>
      <a href="#how-the-frontend-code-works">How the frontend code works</a>
      <ul>
        <li><a href="#purpose-of-the-app">Purpose of the app</a></li>
        <li><a href="#main-components-of-the-app">Main components of the app</a></li>
        <li><a href="#heirarchy-of-components">Heirarchy of components</a></li>
        <li><a href="#operation-of-the-navigational-buttons-of-the-app">Operation of the navigational buttons of the app</a></li>
        <li><a href="#conditional-rendering">Conditional rendering</a></li>
        <li><a href="#data-flow">Data flow</a></li>
        <li><a href="#an-alternative-way-of-getting-data-from-components-home/>-to-plusmenu/>">An alternative way of getting data from components Home/> to PlusMenu/></a></li>
        <li><a href="#other-operations-of-each-page">Other operations of each page</a></li>
      </ul>
    </li>
  </ol>
</details>
<br>

<!-- ABOUT THE PROJECT -->

## About The Project

<p>This is a treasure-hunt app for Girlguiding Scotland.</p>

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

<!-- Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email`, `email_client`, `project_title`, `project_description` -->

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Node.js](https://nodejs.org/en/)
- [React.js](https://reactjs.org/) 
The original coders created this app by using NodeJS module create-react-app.<br>
create-react-app uses bundler webpack under the hood to <br>
transpile Sass files automatically into CSS, so this app <br>
requires the coder simply to write (CSS) classes for React <br>
components in a Sass file called style.scss then to import <br>
style.scss into React components. Do not create a CSS file <br>
and import that into React components. Put your CSS classes directly<br>
in the Sass files (style.scss and the file that it imports, _custom.scss)<br>
- [Bootstrap](https://getbootstrap.com)<br>
Bootstrap provides a lot of ready-made css classes.<br>
- [React-Bootstrap](https://getbootstrap.com)<br>
React-Bootstrap provides ready-made React components that already have<br>
classes for styling applied to them. This app only uses React-Bootstrap's <br>
`<Modal/>` component (for modal windows).<br>
- [Sass](https://sass-lang.com/dart-sass). This is a CSS preprocessor. <br>
The coder must write (CSS) classes in the style.scss file. There is no <br>
style.css file. When the app compiles, the under-the-hood webpack transpiles <br>
the style.scss file into CSS. <br>
- [Mapbox](https://www.mapbox.com/)<br>
- [React Map GL](https://visgl.github.io/react-map-gl/) <br>This provides ready
made React components that encapsulate Mapbox features. It allows you to use
Mapbox in a React app by employing those ready made React Map GL React <br>
components in the app.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This shows how you to set up your project locally.
To get a local copy up and running follow these steps.

### Prerequisites

- Node
  Visit [Node.js](https://nodejs.org/en/download/) and select the appropriate download for your system.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Scottish-Tech-Army/ggs-frontend.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your Mapbox environment token in an env.local file. This will sit in the same level as the package.json. If this environment variable is unset, the app will use OpenStreetMap tiles - recommended for development only.

   ```js
   REACT_APP_MAPBOX_ACCESS_TOKEN = "your-token-here";
   ```

4. Enter your API Gateway GGS backend URL in the env.local file. This will sit in the same level as the package.json.
   ```js
   REACT_APP_AWS_CLIENT_API_ENDPOINT = "API URL";
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



NOTE: wed7June23: this is all out of date: 
To view the working application, complete steps 1 and 2 below:
1. Run the ggs-backend server by navigating to that directory on your machine's CLI. Checkout the appropriate branch and run `dotnet run`.
2. Run the ggs-frontend server by navigating to that directory on your machine's CLI in a new window/tab. Checkout the appropriate branch and run `npm run`. If the backend database has been updated you may need to use `npm run start`.

The app will now run in your browser
END NOTE: wed7June23: this is all out of date:
<br>
<br>
<br>

# Using the Application

## Purpose of the app

This app allows users to perform a treasure hunt.<br>
If the user is in the centre of Glasgow, for example, one of the app's pages shows a map of the user’s location. <br> 
The map contains markers, each of which represents a landmark that the user collects.<br> 
When the user gets to within 20m of the location the marker points to, the app deems the user to have collected the location. A modal pops up that contains an image of the point of interest at that location. <br> 
The modal also includes a description of the point of interest and a challenge for the user to complete.<br>
The user attempts to collect as many locations as possible.<br><br>


## Use of the app
1. The app makes the user think it has multiple pages. In reality it is a single-page app (made via create-react-app).<br> 
A unique React component represents each page (as the user sees it). The `<Home/>` component is parent to these page components and renders only one at any given time using conditional logic.<br>

2. The first page the user sees is the `<LandingPage/>` <br>
Once the user registers or logs in four buttons on this page become operable.<br>
Tapping on each button takes the user to another page of the app.<br>
The other pages of the app are:<br>
The `<ChallengesNearMe/>` page<br>
The `<CompletedChallenges/>` page<br>
The `<ChallengesLeaderboard/>` page<br>
The `<UserGuide/>` page<br>

3. The `<ChallengesNearMe/>` page<br>
When the user goes to this page she sees a map of her area.<br>
On the map are markers that represent locations to collect in the treasure hunt. <br>
When the user physically moves to within 20m of the location that the marker represents, a modal pops up that gives the user some information about the point of interest, shows an image of the point of interest and displays text that tells the user what the challenge is for the location.<br>
By coming withing 20m of the location the app deems the user to have collected the location.<br>
The user continues to other locations and goes through the same process.<br>

4. The `<CompletedChallenges/>` page<br>
This page shows a table of the locations the user has collected (and hence the challenges she has completed)

5. The `<ChallengesLeaderboard/>` page<br>
On this page the user selects a county from a dropdown menu. This makes a table appear that displays GGS units within that region that have collected locations.<br>
The table ranks the units according to the number of locations they have collected.<br>
The top three units get gold, silver and bronze stars.<br>
If two or more units have the same number of locations they get the same ranking and star. <br>

6. The `<UserGuide/>` page<br>
This simply contains text that tells the user how to use the app.

7. Navigation bar<br>
A navigation bar appears at the bottom of these pages: <br>
The `<ChallengesNearMe/>` page<br>
The `<CompletedChallenges/>` page<br>
The `<ChallengesLeaderboard/>` page<br>
The `<UserGuide/>` page<br>
The bar contains two icons: a home icon and a plus icon.<br>
A tap of the home icon takes the user back to the `<LandingPage/>`.<br>
Tapping the plus icon makes a menu pop up. The menu contains three icons, one for each of the other three pages. <br> 
Tapping one of those icons takes the user to the page in question.<br>

8. Main modals<br>
- [Login modal]<br>
This pops up when the user is on the `<LandingPage/>` and clicks the Login button. <br>
This modal presents the user with one input field for entering an email address.<br>
Frontend code validation ensures the user has entered a valid address, ie one that contains symbols on either side of an '@' symbol.<br>
Successful log in makes the buttons on the `<LandingPage/>` operable.<br>
- [Register modal]<br>
This pops up when the user is on the `<LandingPage/>` and clicks the button that reads 'Learn how to register'. <br>
This modal presents the user with three input fields, for entering email address, county and unit name.<br>
Frontend code vallidates the data entered.<br>
Successful registration automatically logs the user into the app.



<!-- HOW THE FRONTEND CODE WORKS -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->

   
<br>
<br>
<br>
<br>
<br>
   

# How the frontend code works

<br>


## Main components of the app

The main React components of this app are:<br>
`<App/>`  -- the parent component of all other components. This component doesn’t actually do anything (and should be removed!).<br>
`<Home/>` -- child of `<App/>`. This conditionally invokes five main components, one for each of the five pages of the app:<br>
`<LandingPage/>` -- the welcome or home page<br>
`<ChallengesNearMePage/>` -- the page that shows a map of the region the user is in, along with  the markers<br>
`<UserGuidePage/>` -- a page that explains how to use the app<br>
`<CompletedChallengesPage/>` -- a page that lists the locations the user has collected<br>
`<LeaderboardPage/>` -- a page that shows a table that ranks GGS users from all regions according to the number of locations they have collected.<br>
`<FormLinkPage/>` -- this is only for field testers. It is commented out in the code for production<br><br>

The page the user sees first is the `<LandingPage/>`, where she first either <br>
* i)   taps the Login button to log in. A modal pops up with a field for entering an email address) or <br>
* ii)  taps the Learn how to register button, which makes a modal pop up where the user can learn how to register and actually register, entering email, unit name and county. Once the user registers she is automatically logged in. <br><br>
You can only use the app's facilities after you have logged in. <br>

<br><br>


## Heirarchy of components

index.js invokes `<App/>`, which actually does nothing except invoke `<Home/>`.

`<Home/>` calls all five page components.*<br>
*In the case of the version of the app for field testers (which is not for production) `<Home/>` also calls a page on which the link to the survey form exists. This page is commented out for production code. This readme won’t from now on mention this page. 

<br>
The main components of the app take their places in a heirarchy that looks like this:<br>

`<App/>` (This serves no purpose! It came with the original code; I should remove it - Mukund )<br>
  - `<Home/>`<br>
     - `<LandingPage/>`<br>
         - `<LogoutModal/>` (Has two screens, conditionally rendered, one for logging in, one for registration)<br> 
         - `<GGSbuttonOne/>` (Login button)<br>
         - `<GGSbuttonOne/>` (How to register button)<br>
         - `<GGSbuttonOne/>` (Large brown button for field testers only; will be commented out for production)<br>
         - `<SquareButton/>` (contains image, not clickable)<br>
         - `<GGSbuttonOne/>` (Takes you to Challenges near me page)<br>
         - `<SquareButton/>` (contains image, not clickable)<br>
         - `<GGSbuttonOne/>` (Takes you to Completed challenges page)<br>
         - `<SquareButton/>` (contains image, not clickable)<br>
         - `<GGSbuttonOne/>` (Takes you to Leaderboard page)<br>
         - `<SquareButton/>` (contains image, not clickable)<br>
         - `<GGSbuttonOne/>` (Takes you to User guide page)<br>
         - `<LoginModal/>`<br><br>
     - `<ChallengesNearMePage/>`<br>
         - `<GGSbuttonOne/>` (Loads a map of the user’s area)<br>
         - `<ReactMapGL/>` (The map)<br>
         - `<LocationModal/>` (Shows info about the location clicked on)<br>
         - `<GeolocErrorModal/>` (Pops up if user has not turned on location services on her mobile)<br>
         - `<NavigationBar/>`<br>
             - `<PlusMenu/>`<br><br>
     - `<CompletedChallengesPage/>`<br>
         - `<NavigationBar/>`<br>
             - `<PlusMenu/>`<br><br>
     - `<LeaderboardPage/>`<br>
         - `<SearchForm/>` (An input and a search button)<br>
         - `<LeaderboardTable/>` (A table)<br>
         - `<NavigationBar/>`<br>
             - `<PlusMenu/>`<br><br>
     - `<UserGuidePage/>` (Simply contains text)<br>
         - `<NavigationBar/>`<br>
            - `<PlusMenu/>`<br><br>
     - `<FormLinkPage>` (For field testers only. Commented out in production code)<br><br><br>


## Operation of the navigational buttons of the app

Each of the five pages contains a navigation bar whose buttons allow the user to go to any other page of the app.<br>

The `<LandingPage/>` is different to the other four pages in that it has no navigation bar. Instead it has four buttons the user can tap to go to any other page.<br>

Each of the other four pages has a navigation bar at 
the bottom that includes two buttons: 
1) a home button - clicking this takes the user back to the landing page
2) a plus button - clicking this makes a three-button menu pop up. Clicking any of those three buttons takes the user to one of the other three pages. The buttons in this menu have different icons depending on the page in question.<br><br><br>


## Conditional rendering

This is how the app creates the illusion of being multi-page.<br>
Each page has an associated pageIndex (a number). <br>
The `<Home/>` component has state property pageIndex. Clicking a navigational button (either those on the `<LandingPage/>` or those in the `<NavigationBar/>`/`<PlusMenu/>` of the other pages), changes the value of `<LandingPage/>`'s state property pageIndex. When the value of pageIndex changes, code makes only the jsx for the page related to that value of pageIndex show. For example the pageIndex value associated with `<UserGuidePage/>` is 3. The following table shows the pageIndex values for each page:<br><br>


| Page | pageIndex | Component |
| --- | :---:  | --- |
| Landing page           |          0  |       `<LandingPage/>` | 
| Challenges near me page |          2  |       `<ChallengesNearMePage/>` | 
| User guide page        |           3  |       `<UserGuidePage/>` | 
| Completed challenges page |        4  |       `<CompletedChallengesPage/>` | 
| Leaderboard page        |          5  |       `<LeaderboardPage/>` | 

<br><br>

Whichever page the user is in, when the user clicks a button to take her to another page, the button’s click handler simply changes the value of `<Home/>`’s state property pageIndex to the number corresponding to the page in question (see table above). Conditional logic in `<Home/>` renders only the component for the page that corresponds to the value of pageIndex.<br><br>


### Conditional logic

`<Home/>` sets a page component’s isThisPageActive prop 
to true or false by reading the value of `<Home/>`’s 
pageIndex state property, like this for example:<br>
`<UserGuidePage 
  isThisPageActive = {pageIndex === 3}  
  />`<br>
So, above, `isThisPageActive` has value `true` if `pageIndex` has 
value `3` and value `false` if `pageIndex` has value `0`, `2`, `3`, `4` or `5`.<br><br>
3) Code in each of the six page components renders the page 
if the value of `isThisPageActive` is `true` by returning JSX 
that describes the page. If `isThisPageActive` is `false` the code 
returns null, so the page does not display.

So tapping the home icon in `<NavigationBar/>` or an icon in `<PlusMenu/>` or tapping 
a button of the landing page changes the value of `<Home/>`’s 
state property `pageIndex`, causing a rerender of `<Home/>` and its descendants, 
causing a new page to show.

For example clicking an icon `<img>` in `<PlusMenu/>` changes the value 
of `<Home/>`’s state property `pageIndex`. 
Changing `pageIndex` to, say, 5 makes `<Home/>` rerender. But only the page that is 
associated with a `pageIndex` value of 5 (`<LeaderboardPage/>`) 
will display because when `<Home/>` calls a page component
it does so like this:
`<LeaderboardPage
  isThisPageActive = {pageIndex === 5}  
  />`
With `pageIndex` having a value of 5 `<LeaderboardPage>`’s
prop `isThisPageActive` gains value true. All the other
page components will have `isThisPageActive` props with 
value `false`. 
Conditional rendering in each page component
definition looks at the value of `isThisPageActive`. If it 
is true the component definition returns JSX that describes
the page (and the page displays). If it is false the 
component definition returns null (and the page is hidden).<br><br>






# Data flow

1) The onClick event handlers for <br>
i)   the four buttons of the landing page<br>
ii)  the home icon of the other four pages and <br>
iii) the three plus-menu icons of the other four pages <br>
all do exacly the same thing: they change the value of `<Home/>`’s state
property `pageIndex` to a value related to the page the user wants to
go to (see table above).<br><br>

2) `<Home/>` makes iconsObject available to each of the five page components via a React context hook. iconsObject contains five objects, each relevant to a specific page.<br><br>


3) In the case of the landing page<br>
`<LandingPage/>` extracts object p0 from iconsObject. p0 contains onClick handlers for the buttons on the landing page. `<LandingPage/>` passes these onClick handlers to these `<GGSbuttonOne/>`s as props.
These onClick event handlers change the value of `<Home/>`’s state property `pageIndex`. 

4) In the case of the other four pages:
`<ChallengesNearMePage/>` extracts object p2 from iconsObject.
`<UserGuidePage/>` extracts object p3 from iconsObject.
`<CompletedChallengesPage/>` extracts object p4 from iconsObject.
`<LeaderboardPage/>` extracts object p5 from iconsObject.

Each of the page components above has child `<NavigationBar/>`, to which it sends the object (p2, p3, p4 or p5) as props. `<NavigationBar/>` sends that object as props to its child `<PlusMenu/>`.

Each of the objects p2-p5 contains
i)   an onClick handler for the home button for a page (this button appears in `<NavigationBar/>`)
ii)  three onClick handlers, one for each of the icons in a page’s `<PlusMenu/>` (they are obviuously different for each page)
iii) three image srcs, one for each of the icons in a page’s `<PlusMenu/>` (they are obviously different for each page).
<br><br><br>







# An alternative way of getting data from `<Home/>` to `<PlusMenu/>`

Instead of passing data from `<Home/>` to `<PlusMenu/>` first by sending 
that data via a React context hook to a page component and from there 
via props to `<NavigationBar/>` and from there via props to `<PlusMenu/>`
I could have:
1) made the iconObject data in `<Home/>` available to `<PlusMenu/>` via a React context hook (which is actually also the case at the moment)
2) passed a prop from a page component to `<NavigationBar/>` to `<PlusMenu/>`
that tells `<PlusMenu/>` what the page is. The prop could be whatPage and
its value would be a string, eg, “Userguide page” or “Completed challenges page”.
3) used conditional statements in the definition of `<PlusMenu/>` to 
set the src and onClick attributes of `<PlusMenu/>`’s icons.
4) `<PlusMenu/>` would take this form:<br>

`export function PlusMenu({whatPage}) {`

`let dataObject;`

`... if statements here for pages 1 and 2`

`if (whatPage === “Userguide page”) {`
`dataObject = iconsObject.p3`
							`}`

`if (whatPage === “Completed challenges page”) {`
`dataObject = iconsObject.p4`
    						            `    }`

`... if statement here for page 5`

`return (`

`<img src = {dataObject.icon1src}`
        `onClick = {dataObject.icon1ClickHandler}`

`<img src = {dataObject.icon2src}`
        `onClick = {dataObject.icon2ClickHandler}`

... similarly set the src and onClick attribs of the other 
two `<img>`s here

`)`
`}`

<br><br><br><br>

# Other operations of each page

### **`<LandingPage/>`**<br>
A)<br>
Operation of child `<LogoutModal/>`:<br>
If the user has logged in and then at some stage logs out, the `<LogoutModal/>` shows for several seconds then disappears. It simply displays a message telling the user that she has logged out. <br>
NOTE: Fri2June23 - might be worth moving most of the code that conditionally renders `<LogoutModal/>` out of `<LandingPage/>`’s return function (and obviously change the code completely) but it may not be worth bothering as it is valid code and does work -- see notes<br><br><br><br>

B)<br>
Operation of child `<LoginModal/>`:<br>
a)<br>
`<LoginModal/>` has two screens, one for logging in and one for registering.<br>
Code conditionally renders this component according to the value of state property showLogin. <br>
Two onClick handlers set the value of showLogin:<br>
i)    the onClick handler of `<LandingPage/>`’s Login button. this also sets `<LoginModal/>` prop whichModalScreen to “login”, which tells `<LoginModal/>` to show the login screen only<br>
ii)   the onClick handler of `<LandingPage/>`’s Learn how to register button. This also sets `<LoginModal/>` prop whichModalScreen to “register”, which tells `<LoginModal/>` to show the register screen only.<br><br><br>

b)<br>
`<LoginModal/>`’s login screen:<br>
This is a form with one input (for email). <br>
The onClick handler for this screen’s Start exploring button:<br>
i)   validates the email input (showing error messages in red on screen on invalid user input and NOT contacting the backend) <br>
ii)  on valid user input sends the email string to the backend, which returns a js object like this:<br>
`{
email: “test@test”,
name: “Testy Tester”
}`<br>
iii) sets AuthContext.js’s state property unit to this js object<br>
iv)  calls a `<LandingPage/>` function that makes all of the main `<LandingPage/>` buttons operable and opaque.<br><br><br>

c)<br>
`<LoginModal/>`’s registration screen:<br>
This is a form with three inputs.<br>
The onClick handler of the Register button has the same sort of form validation as the onClick handler of the Start exploring button of the login screen.<br><br><br><br>

C)<br>
After the user enters valid input for email, unit name and county name and taps the Register button, the registration screen and login modal disappear and the user has to log in. (fri2June23: This will change soon so that the app automatically logs in the new user after she has registered successfully).<br><br><br><br>



### **`<ChallengesNearMePage/>`**<br>
A) <br>
This page has access to `<AuthProvider/>`’s `unit` state property (through context).<br>
When `unit` changes this component gets the locations array from the backend (this is done via a `useEffect()` hook). <br>

The `locations` array contains xxxx<br>

On first execution of this component (function) a `useEffect()` hook gets the user’s location data.<br>

NOTE: wed7June23: the follwing will change:
When the page first loads it shows a map of Edinburgh with markers showing the points of interest. The user must click button Tap here for your map for the page to show the map surrounding the user’s location (also with markers showing the points of interest).<br>
END NOTE: wed7June23: the follwing will change<br>

This page employs `<ReactMapGL/>` to provide the maps.<br>
`<ReactMapGL/>` has child `<Markers/>`.<br>
`<Markers/>` has children `<Marker/>` and `<Pin/>`<br>

The markers are dark blue and fully opaque if the user has still to collect that location. A marker becomes more see-through after the user has collected that location.<br><br><br>

B) child `<LocationModal/>`<br>
`<ChallengesNearMePage/>` conditionally renders `<LocationModal/>`, which pops up when the user clicks on an opaque blue marker. <LocationModal/> contains an image and information about the location/point of interest.<br><br><br><br>




### **`<UserGuidePage/>`**<br>
This is no more than headings and text that explain to the user how to use the app.<br><br><br><br>



### **`<CompletedChallengesPage/>`**<br>
This page contains button Show completed challenges and a table, initially empty.<br>

The onClick handler for button Show completed challenges <br>
i)   gets the user’s completed challenges from the backend.<br>
	this is an array of objects and looks like this: <br>
	`[{area: “Watford, Hertfordshire”, percentageCollected: 50}, etc ]` <br>
ii)  uses the array returned by the backend to make a table of two headers and columns (“Area” and “% collected”) <br><br><br><br>


### **`<LeaderboardPage/>`**<br>
This consists of an search input field and a Find button.<br>
The user types in the input field and a dropdown of regions appears.<br>
The user selects an option from the dropdown and clicks the Find button.<br>
The click handler for the find button:<br>
i)   retrieves data from the backend<br>
ii)  builds a table and puts that data in it<br><br><br><br>

### **All modals**<br>
For example `<LogoutModal/>` and `<LoginModal/>`. <br>
All components representing modals in this app employ React-Bootstrap’s `<Form/>`, `<Modal/>` and `<Button/>` components.<br><br>


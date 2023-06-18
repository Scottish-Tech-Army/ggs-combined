import React, { createContext, useState, useEffect } from 'react';


/*
HOW THIS COMPONENT WORKS
------------------------
1) index.js imports this component (<AuthProvider/>) and <App/>
and invokes both like this:
<AuthProvider>
      <App />
</AuthProvider>,
so every component (and their descendants and theirs, etc, ad infinitum)
between <AuthProvider> and <AuthProvider/>
receives the context in question (because of this 
component's use of {children} in its return statement below).
2) <App/> simply invokes <Home/> (NOTE: why index.js doesn't simply
invoke <Home/> I don't know! -- Mukund)
3) So the context in authContext is available to every 
component <Home/> invokes and their children and theirs, etc.
4) The context (which is, eg, this object: 
  {
    unit: {email:"mukund.pandit@virginmedia.com", name:"TeamMukund"},
    setUnit: setUnit
  }
                )
  gets passed in as props to authContext (which code here creates).
 5) Code originally sets the unit state property in this component
 to the unit object 
 (eg {email:"mukund.pandit@virginmedia.com", name:"TeamMukund"}) 
 when the user first registers (when a function in <LoginModal/> 
 calls this component's setUnit function). 
 6) Whenever the unit object changes code in this component stores
 the new version in localStorage.
*/ 







// create (and export) a context object that is initially empty:
export const authContext = createContext({});



// The key under which code stores the unit object in localStorage:
const UNIT_KEY = "ggsUnit" 





const AuthProvider = ({ children }) => {
  // Simulate user not having logged in:
  const [unit, setUnit] = useState(false);
  // Simulate user having logged in:
  // const [unit, setUnit] = useState(true);
  // Original:
  // const [unit, setUnit] = useState();

// useEffect() below runs only once, when the 
// component function first runs (and never after).
// It retrieves what's in localStorage under 
// key "ggsUnit" and if that value is truthy sets 
// the value of state property unit to that value. 
  useEffect(() => {
    const storedUnit = window.localStorage.getItem(UNIT_KEY)
    // storedUnit has this form: {"email":"mukund.pandit@virginmedia.com","name":"TeamMukund"}
    // console.log("In AuthContext and retrieved stored unit is ", storedUnit);
    storedUnit && setUnit(JSON.parse(storedUnit));
                  }, []);


 // Mukund: When there's a change in the value of state 
 // property unit, determine whether it needs to be stored 
 // in localStorage.
 // The first useEffect() (above) makes state property unit 
 // change on first mount of this component if unit exists 
 // in local storage. Hence the useEffect() below will run 
 // after the one above. 
 // The useEffect() below translates to:
// When unit changes, put unit into local storage if
// unit is truthy and either of these two scenarios exists:
// i)  storedUnit is falsey (regardless of the value of (truthy) unit)
// ii) storedUnit is truthy but different to unit

 useEffect(() => {
    const storedUnit = window.localStorage.getItem(UNIT_KEY)

    if (unit && (!storedUnit || unit !== JSON.parse(storedUnit))) {
      window.localStorage.setItem(UNIT_KEY, JSON.stringify(unit));
    }
                 }, [unit]);




  return (
    <authContext.Provider value={{ unit, setUnit }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
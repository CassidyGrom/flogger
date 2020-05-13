import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AnimatedSwitch, spring, AnimatedRoute  } from 'react-router-transition';
import NewEntry from './pages/newEntries';
import SavedEntries from './pages/savedEntries.js';
import Navbar from './components/Navbar';
import './index.css';
import * as API from './utils/API';
import AuthService from './utils/auth';

// import our context object for state
import UserInfoContext from './utils/UserInfoContext';

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}

// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(.5),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(2),
    scale: bounce(1),
  },
};

function App() {
  // set data to be used for UserInfoContext and make it available to all other components
  const [userInfo, setUserInfo] = useState({
    journals: [],
    username: '',
    journalCount: 0,
    // method to get user data after logging in
    getUserData: () => {
      // if user's logged in get the token or return null
      const token = AuthService.loggedIn() ? AuthService.getToken() : null;

      if (!token) {
        return false;
      }
      API.getMe(token)
        .then(({ data: { username, journals, journalCount } }) =>
          setUserInfo({ ...userInfo, username, journals, journalCount })
        )
        .catch((err) => console.log(err));
    },
  });

  // on load, get user data if a token exists
  useEffect(() => {
    userInfo.getUserData();
  }, []);

  return (
    <Router>
      <>
        {/* wrap our entire app in context provider and provide userInfo state as value */}
        <UserInfoContext.Provider value={userInfo}>
          <Navbar />
          <AnimatedSwitch
         atEnter={bounceTransition.atEnter}
         atLeave={bounceTransition.atLeave}
         atActive={bounceTransition.atActive}
         mapStyles={mapStyles}
         className="route-wrapper">
            <Route exact path='/' component={NewEntry} />
            <Route exact path='/saved' component={SavedEntries} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </AnimatedSwitch>
        </UserInfoContext.Provider>
      </>
    </Router>
  );
}

export default App;
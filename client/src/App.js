import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NewEntry from './pages/NewEntries';
// import SavedEntries from './pages/SavedEntries';
import Navbar from './components/Navbar';

import * as API from './utils/API';
import AuthService from './utils/auth';

// import our context object for state
import UserInfoContext from './utils/UserInfoContext';

function App() {
  // set data to be used for UserInfoContext and make it available to all other components
  const [userInfo, setUserInfo] = useState({
    savedEntries: [],
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
        .then(({ data: { username, savedEntries, journalCount } }) =>
          setUserInfo({ ...userInfo, username, savedEntries, journalCount })
        )
        .catch((err) => console.log(err));
    },
  });

  // on load, get user data if a token exists
  useEffect(() => {
    userInfo.getUserData();
  });

  return (
    <Router>
      <>
        {/* wrap our entire app in context provider and provide userInfo state as value */}
        <UserInfoContext.Provider value={userInfo}>
          <Navbar />
          <Switch>
            <Route exact path='/' component={NewEntry} />
            {/* <Route exact path='/saved' component={SavedEntries} /> */}
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </UserInfoContext.Provider>
      </>
    </Router>
  );
}

export default App;
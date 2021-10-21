import React from 'react';
import SearchPage from './components/SearchPage';
import ProfilePage from './components/ProfilePage';
import ProfilesContextProvider from './components/ProfilesContextProvider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles.css';

function App() {
  return (
    <ProfilesContextProvider>
      <Router>
        <Switch>
          <Route path="/" exact>
            <SearchPage />
          </Route>
          <Route path="/:profileId" exact>
            <ProfilePage />
          </Route>
          <Route path="*">
            <div>Route Not Found</div>
          </Route>
        </Switch>
      </Router>
    </ProfilesContextProvider>
  );
}

export default App;

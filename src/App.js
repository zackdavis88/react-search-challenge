import React from 'react';
import SearchPage from './components/SearchPage';
import ProfilePage from './components/ProfilePage';
import NotFoundPage from 'components/NotFoundPage';
import PokemonContextProvider from './components/PokemonContextProvider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from 'components/Header';
import './styles.css';

function App() {
  return (
    <PokemonContextProvider>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <SearchPage />
          </Route>
          <Route path="/:pokemonId" exact>
            <ProfilePage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </PokemonContextProvider>
  );
}

export default App;

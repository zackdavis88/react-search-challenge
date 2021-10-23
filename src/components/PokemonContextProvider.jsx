import React from 'react';
import { sortAscending, sortDescending } from '../utils';
export const POKEMON_REQUESTED = 'POKEMON_REQUESTED';
export const POKEMON_SUCCESS = 'POKEMON_SUCCESS';
export const POKEMON_FAILURE = 'POKEMON_FAILURE';
export const SORT_ASCENDING = 'SORT_ASCENDING';
export const SORT_DESCENDING = 'SORT_DESCENDING';
export const TOGGLE_REFRESH = 'TOGGLE_REFRESH';
export const REFRESH_POKEMON = 'REFRESH_POKEMON';

export const PokemonContext = React.createContext({
  isLoading: false,
  pokemonArray: [],
  error: '',
  autoRefresh: false,
  sorted: '',
});

function PokemonReducer(state, action) {
  let pokemonArray;

  switch (action.type) {
    case POKEMON_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case POKEMON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pokemonArray: action.pokemonArray,
        error: '',
      };
    case REFRESH_POKEMON:
      pokemonArray = [...action.pokemonArray];
      if (state.sorted === 'ascending') sortAscending(pokemonArray);
      else if (state.sorted === 'descending') sortDescending(pokemonArray);
      return {
        ...state,
        pokemonArray,
        error: '',
      };
    case POKEMON_FAILURE:
      return {
        ...state,
        isLoading: false,
        pokemonArray: [],
        error: 'Something went wrong while fetching from the API',
      };
    case SORT_ASCENDING:
      pokemonArray = [...state.pokemonArray];
      sortAscending(pokemonArray);
      return {
        ...state,
        pokemonArray,
        sorted: 'ascending',
      };

    case SORT_DESCENDING:
      pokemonArray = [...state.pokemonArray];
      sortDescending(pokemonArray);
      return {
        ...state,
        pokemonArray,
        sorted: 'descending',
      };
    case TOGGLE_REFRESH:
      return {
        ...state,
        autoRefresh: !state.autoRefresh,
      };
    default:
      throw new Error();
  }
}

function PokemonContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(PokemonReducer, {
    isLoading: false,
    pokemonArray: [],
    error: '',
    autoRefresh: false,
    sorted: '',
  });

  return (
    <PokemonContext.Provider value={{ ...state, dispatch }}>{children}</PokemonContext.Provider>
  );
}

export default PokemonContextProvider;

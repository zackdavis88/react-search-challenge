import {
  POKEMON_REQUESTED,
  POKEMON_SUCCESS,
  POKEMON_FAILURE,
  REFRESH_POKEMON,
} from './components/PokemonContextProvider';
import { apiUrl } from './apiconfig.json';

export const formatPokemonNumber = (number) => {
  if (number >= 100) return `#${number}`;

  let paddedNumber = `00${number}`;
  paddedNumber = paddedNumber.slice(paddedNumber.length - 3);
  return `#${paddedNumber}`;
};

export const fetchPokemon = async (pokemonContext, isRefresh = false) => {
  // for a better feeling experience, lets not fire the request action for refreshes.
  if (!isRefresh) {
    pokemonContext.dispatch({ type: POKEMON_REQUESTED });
  }
  const response = await fetch(`${apiUrl}/pokemon?limit=20`);
  if (response.status !== 200) return pokemonContext.dispatch({ type: POKEMON_FAILURE });

  const body = await response.json();
  const results = body.results;
  const pokemonArray = results.map((pokemon, index) => {
    return {
      ...pokemon,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        index + 1
      }.png`,
      number: index + 1,
    };
  });
  // Fire off a dispatch to populate or refresh the store.
  return pokemonContext.dispatch({
    type: isRefresh ? REFRESH_POKEMON : POKEMON_SUCCESS,
    pokemonArray: pokemonArray || [],
  });
};

export const sortAscending = (pokemonArray) =>
  pokemonArray.sort((pokemonA, pokemonB) => (pokemonA.name > pokemonB.name ? 1 : -1));

export const sortDescending = (pokemonArray) =>
  pokemonArray.sort((pokemonA, pokemonB) => (pokemonA.name < pokemonB.name ? 1 : -1));

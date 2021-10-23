import {
  POKEMON_REQUESTED,
  POKEMON_SUCCESS,
  POKEMON_FAILURE,
  REFRESH_POKEMON,
} from './components/PokemonContextProvider';
import { apiUrl } from './apiconfig.json';

export const fetchPokemon = async (profileContext, isRefresh = false) => {
  // for a better feeling experience, lets not fire the request action for refreshes.
  if (!isRefresh) {
    profileContext.dispatch({ type: POKEMON_REQUESTED });
  }
  const response = await fetch(`${apiUrl}/pokemon?limit=12`);
  if (response.status !== 200) return profileContext.dispatch({ type: POKEMON_FAILURE });

  const body = await response.json();
  const results = body.results;
  console.log(results);
  const pokemonArray = results.map((pokemon, index) => {
    return {
      ...pokemon,
      photoUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        index + 1
      }.png`,
    };
  });
  // Fire off a dispatch to populate or refresh the store.
  return profileContext.dispatch({
    type: isRefresh ? REFRESH_POKEMON : POKEMON_SUCCESS,
    profiles: pokemonArray || [],
  });
};

export const sortAscending = (profileArray) =>
  profileArray.sort((profileA, profileB) => (profileA.name > profileB.name ? 1 : -1));

export const sortDescending = (profileArray) =>
  profileArray.sort((profileA, profileB) => (profileA.name < profileB.name ? 1 : -1));

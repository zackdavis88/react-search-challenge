import {
  POKEMON_REQUESTED,
  POKEMON_SUCCESS,
  POKEMON_FAILURE,
  REFRESH_POKEMON,
} from './components/PokemonContextProvider';
import { apiUrl, lastPokemonNumber } from './appconfig.json';

export const getTypeColor = (type) => {
  switch (type) {
    case 'bug':
      return '#a8b820';
    case 'dark':
      return '#705848';
    case 'dragon':
      return '#7038f8';
    case 'electric':
      return '#f8d030';
    case 'fairy':
      return '#ee99ac';
    case 'fighting':
      return '#c03028';
    case 'fire':
      return '#f08030';
    case 'flying':
      return '#a890f0';
    case 'ghost':
      return '#705898';
    case 'grass':
      return '#78c850';
    case 'ground':
      return '#e0c068';
    case 'ice':
      return '#98d8d8';
    case 'normal':
      return '#a8a878';
    case 'poison':
      return '#a040a0';
    case 'psychic':
      return '#f85888';
    case 'rock':
      return '#b8a038';
    case 'steel':
      return '#b8b8d0';
    case 'water':
      return '#6890f0';
    default:
      return '#ffffff';
  }
};

export const formatPokemonNumber = (number) => {
  if (number >= 100) return `#${number}`;

  let paddedNumber = `00${number}`;
  paddedNumber = paddedNumber.slice(paddedNumber.length - 3);
  return `#${paddedNumber}`;
};

export const fetchPokemonById = (pokemonId) =>
  new Promise((resolve) => {
    fetch(`${apiUrl}/pokemon/${pokemonId}`).then((response) => {
      return resolve(response);
    });
  });

export const fetchPokemon = async (pokemonContext, isRefresh = false) => {
  // for a better feeling experience, lets not fire the request action for refreshes.
  if (!isRefresh) {
    pokemonContext.dispatch({ type: POKEMON_REQUESTED });
  }
  const { itemsPerPage, page } = pokemonContext;
  const response = await fetch(
    `${apiUrl}/pokemon?limit=${itemsPerPage}&offset=${(page - 1) * itemsPerPage}`
  );
  if (response.status !== 200) return pokemonContext.dispatch({ type: POKEMON_FAILURE });

  const body = await response.json();
  const results = body.results;

  const pokemonArray = results.reduce((prev, pokemon, index) => {
    const number = (page - 1) * itemsPerPage + (index + 1);
    if (number > lastPokemonNumber) return prev;

    return prev.concat({
      ...pokemon,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        (page - 1) * itemsPerPage + (index + 1)
      }.png`,
      number: (page - 1) * itemsPerPage + (index + 1),
    });
  }, []);

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

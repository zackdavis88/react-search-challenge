import React from 'react';
import { sortAscending, sortDescending } from '../utils';
export const PROFILES_REQUESTED = 'PROFILES_REQUESTED';
export const PROFILES_SUCCESS = 'PROFILES_SUCCESS';
export const PROFILES_FAILURE = 'PROFILES_FAILURE';
export const SORT_ASCENDING = 'SORT_ASCENDING';
export const SORT_DESCENDING = 'SORT_DESCENDING';
export const TOGGLE_REFRESH = 'TOGGLE_REFRESH';
export const REFRESH_PROFILES = 'REFRESH_PROFILES';

export const ProfileContext = React.createContext({
  isLoading: false,
  profiles: [],
  error: '',
  autoRefresh: false,
  sorted: '',
});

function ProfilesReducer(state, action) {
  let profiles;

  switch (action.type) {
    case PROFILES_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case PROFILES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profiles: action.profiles,
        error: '',
      };
    case REFRESH_PROFILES:
      // If we are just refreshing the profiles then I think its a better user experience if we maintain
      // any sorting that was applied.
      profiles = [...action.profiles];
      if (state.sorted === 'ascending') sortAscending(profiles);
      else if (state.sorted === 'descending') sortDescending(profiles);
      return {
        ...state,
        profiles,
        error: '',
      };
    case PROFILES_FAILURE:
      return {
        ...state,
        isLoading: false,
        profiles: [],
        error: 'Something went wrong while fetching from the API',
      };
    case SORT_ASCENDING:
      profiles = [...state.profiles];
      sortAscending(profiles);
      return {
        ...state,
        profiles,
        sorted: 'ascending',
      };

    case SORT_DESCENDING:
      profiles = [...state.profiles];
      sortDescending(profiles);
      return {
        ...state,
        profiles,
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

function ProfilesContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(ProfilesReducer, {
    isLoading: false,
    profiles: [],
    error: '',
    autoRefresh: false,
    sorted: '',
  });

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>{children}</ProfileContext.Provider>
  );
}

export default ProfilesContextProvider;

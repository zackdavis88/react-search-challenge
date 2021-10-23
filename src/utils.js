import {
  PROFILES_REQUESTED,
  PROFILES_SUCCESS,
  PROFILES_FAILURE,
  REFRESH_PROFILES,
} from './components/ProfilesContextProvider';
import { apiUrl } from './apiconfig.json';

export const fetchProfiles = async (profileContext, isRefresh = false) => {
  // for a better feeling experience, lets not fire the request action for refreshes.
  if (!isRefresh) {
    profileContext.dispatch({ type: PROFILES_REQUESTED });
  }
  const response = await fetch(apiUrl);
  if (response.status !== 200) return profileContext.dispatch({ type: PROFILES_FAILURE });

  const body = await response.json();
  // Fire off a dispatch to populate or refresh the store.
  return profileContext.dispatch({
    type: isRefresh ? REFRESH_PROFILES : PROFILES_SUCCESS,
    profiles: body.profiles || [],
  });
};

export const sortAscending = (profileArray) =>
  profileArray.sort((profileA, profileB) => (profileA.handle > profileB.handle ? 1 : -1));

export const sortDescending = (profileArray) =>
  profileArray.sort((profileA, profileB) => (profileA.handle < profileB.handle ? 1 : -1));

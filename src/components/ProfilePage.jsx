import { useContext, useEffect, useState } from 'react';
import Header from './Header';
import { ProfileContext } from './ProfilesContextProvider';
import ErrorBanner from './ErrorBanner';
import LoadingBanner from './LoadingBanner';
import { useParams } from 'react-router-dom';
import { fetchProfiles } from '../utils';
import styled from 'styled-components';

const ProfilePageWrapper = styled.div`
  max-width: 1280px;
  margin: auto;
  padding: 24px;
  display: flex;
  @media (max-width: 599.95px) {
    flex-direction: column;
  }
`;

const ProfileImage = styled.img`
  min-width: 360px;
  border: 1px solid lightgray;
  border-radius: 8px;
  box-shadow: 0 3px 6px lightgray, 0 3px 6px;
  @media (max-width: 599.95px) {
    max-width: 360px;
    width: 100%;
    min-width: 0;
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  width: 100%;
  padding: 0 0 0 18px;
  grid-gap: 16px;
  grid-template-rows: 1fr 1fr;
  @media (max-width: 599.95px) {
    padding: 18px 0 0 0;
  }
`;

const DataLabel = styled.label`
  font-size: 20px;
  font-weight: 700;
  color: #8e8e8e;
  text-transform: uppercase;
`;

const DataValue = styled.div`
  font-size: 35px;
`;

const ColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const ProfilePage = (props) => {
  const [profile, setProfile] = useState(null);
  const profileContext = useContext(ProfileContext);
  const { profileId } = useParams();

  useEffect(() => {
    /* NOTES ON THIS LOGIC
       
      This logic makes some assumptions about the profiles data that we are using. It assumes that the data is a complete list of all profiles,
      if a user is not contained in the array then they do not exist.

      In a real world application: this is a bad assumption because the API could be paginated and returning just a subset of all profiles. We
      would probably want to update this logic to fetch the individual profile via API call (using the :profileId slug in the url) instead of
      pulling an individual profile out of the profiles array.

      For this particular coding challenge, using the data provided for profiles, the below approach works well.
    */
    const { profiles } = profileContext;
    if (!profiles || !profiles.length) {
      return fetchProfiles(profileContext);
    }
    // Hitting this block means we have data in the store.
    const profile = profiles.find((profile) => profile.id === Number(profileId));
    setProfile(profile);
  }, [profileContext, profileId, profile]);

  const renderContent = () => {
    const { isLoading, error } = profileContext;
    if (profile === null || isLoading) return <LoadingBanner />; // check for profile === null because that means we are still initializing the component's state.

    if (error)
      return <ErrorBanner message={`Something went wrong fetching profile ${profileId}`} />;

    if (!profile) return <ErrorBanner message={'User not found'} />; // profile will be undefined (not null) if we failed to find their ID in the profiles array.

    return (
      <>
        <ProfilePageWrapper>
          <ProfileImage
            src={`${profile.photoUrl.replace('200/200', '360/360')}`}
            alt="potential date"
          />
          <DetailsGrid>
            <ColumnGrid>
              <div>
                <DataLabel htmlFor="handle">Handle</DataLabel>
                <DataValue id="handle">{profile.handle}</DataValue>
              </div>
              <div>
                <DataLabel htmlFor="location">Location</DataLabel>
                <DataValue id="location">{profile.location}</DataValue>
              </div>
            </ColumnGrid>
            <ColumnGrid>
              <div>
                <DataLabel htmlFor="age">Age</DataLabel>
                <DataValue id="age">{profile.age}</DataValue>
              </div>
              <div>
                <DataLabel htmlFor="photoCount">Photos</DataLabel>
                <DataValue id="photoCount">{profile.photoCount}</DataValue>
              </div>
            </ColumnGrid>
          </DetailsGrid>
        </ProfilePageWrapper>
      </>
    );
  };

  return (
    <>
      <Header />
      {renderContent()}
    </>
  );
};

export default ProfilePage;

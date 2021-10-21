import React from 'react';
import { ProfileContext } from './ProfilesContextProvider';
import MinimalButton from './MinimalButton';
import Header from './Header';
import SearchCard from './SearchCard';
import { SORT_ASCENDING, SORT_DESCENDING } from './ProfilesContextProvider';
import ErrorBanner from './ErrorBanner';
import LoadingBanner from './LoadingBanner';
import { fetchProfiles } from '../utils';
import styled from 'styled-components';

const StyledMain = styled.main`
  margin: 24px;
`;

const ActionButtonsGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 16px;
  @media (max-width: 1280px) and (min-width: 950px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 949.95px) and (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 599.95px) {
    grid-template-columns: 1fr;
  }
`;

const StyledImage = styled.img`
  width: 22px;
`;

class SearchPage extends React.Component {
  static contextType = ProfileContext;

  componentDidMount() {
    const { profiles = [] } = this.context;
    if (!profiles || !profiles.length) {
      fetchProfiles(this.context);
    }
  }

  handleSortAscending = () => {
    this.context.dispatch({ type: SORT_ASCENDING });
  };

  handleSortDescending = () => {
    this.context.dispatch({ type: SORT_DESCENDING });
  };

  renderContent = () => {
    const { profiles = [], isLoading, error } = this.context;
    if (isLoading) return <LoadingBanner />;

    if (error) return <ErrorBanner message={error} />;

    return (
      <StyledMain>
        <ActionButtonsGroup>
          <MinimalButton disabled>
            <StyledImage src="filter.svg" alt="filter" />
          </MinimalButton>
          <MinimalButton onClick={this.handleSortAscending}>
            <StyledImage src="./ascending.svg" alt="Sort ascending" />
          </MinimalButton>

          <MinimalButton onClick={this.handleSortDescending}>
            <StyledImage src="./descending.svg" alt="Sort descending" />
          </MinimalButton>
        </ActionButtonsGroup>

        <StyledGrid>
          {profiles.map((profile, index) => (
            <SearchCard
              key={index}
              profileId={profile.id}
              photoUrl={profile.photoUrl}
              handle={profile.handle}
              location={profile.location}
              age={profile.age}
              photoCount={profile.photoCount}
            />
          ))}
        </StyledGrid>
      </StyledMain>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        {this.renderContent()}
      </React.Fragment>
    );
  }
}

export default SearchPage;

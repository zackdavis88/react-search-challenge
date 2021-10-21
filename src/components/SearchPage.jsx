import React from 'react';
import { ProfileContext } from './ProfilesContextProvider';
import MinimalButton from './MinimalButton';
import Header from './Header';
import SearchCard from './SearchCard';
import { SORT_ASCENDING, SORT_DESCENDING } from './ProfilesContextProvider';
import ErrorBanner from './ErrorBanner';
import LoadingBanner from './LoadingBanner';
import { fetchProfiles } from '../utils';

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
      <main style={{ margin: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <MinimalButton disabled>
            <img src="filter.svg" width={22} alt="filter" />
          </MinimalButton>

          <MinimalButton onClick={this.handleSortAscending}>
            <img src="./ascending.svg" width={22} alt="Sort ascending" />
          </MinimalButton>

          <MinimalButton onClick={this.handleSortDescending}>
            <img src="./descending.svg" width={22} alt="Sort descending" />
          </MinimalButton>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gridGap: '16px',
          }}
        >
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
        </div>
      </main>
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

import React from 'react';
import { PokemonContext, SORT_ASCENDING, SORT_DESCENDING } from './PokemonContextProvider';
import MinimalButton from './MinimalButton';
import SearchCard from './SearchCard';
import ErrorBanner from './ErrorBanner';
import LoadingBanner from './LoadingBanner';
import { fetchPokemon } from '../utils';
import styled from 'styled-components';
// import RefreshTimer from './RefreshTimer';

const StyledMain = styled.main`
  padding: 24px;
  display: block;
  position: relative;
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
  @media (max-width: 949.95px) and (min-width: 650px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 649.95px) {
    grid-template-columns: 1fr;
  }
`;

const StyledImage = styled.img`
  width: 22px;
`;

class SearchPage extends React.Component {
  static contextType = PokemonContext;

  componentDidMount() {
    const { pokemonArray = [] } = this.context;
    if (!pokemonArray || !pokemonArray.length) {
      fetchPokemon(this.context);
    }
  }

  handleSortAscending = () => {
    this.context.dispatch({ type: SORT_ASCENDING });
  };

  handleSortDescending = () => {
    this.context.dispatch({ type: SORT_DESCENDING });
  };

  renderContent = () => {
    const { pokemonArray = [], isLoading, error } = this.context;
    if (isLoading) return <LoadingBanner />;

    if (error) return <ErrorBanner message={error} />;

    return (
      <StyledMain>
        <StyledGrid>
          {pokemonArray.map((pokemon, index) => (
            <SearchCard {...pokemon} key={index} />
          ))}
        </StyledGrid>
      </StyledMain>
    );
  };

  render() {
    return <React.Fragment>{this.renderContent()}</React.Fragment>;
  }
}

export default SearchPage;

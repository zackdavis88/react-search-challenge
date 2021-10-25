import React from 'react';
import {
  PokemonContext,
  UPDATE_ITEMS_PER_PAGE,
  UPDATE_PAGE,
  SORT_ASCENDING,
  SORT_DESCENDING,
} from './PokemonContextProvider';
import SearchCard from './SearchCard';
import ErrorBanner from './ErrorBanner';
import LoadingBanner from './LoadingBanner';
import { fetchPokemon } from '../utils';
import styled from 'styled-components';
import RefreshTimer from './RefreshTimer';
import { lastPokemonNumber } from '../appconfig.json';
import MinimalButton from './MinimalButton';

const StyledMain = styled.main`
  padding: 24px;
  display: block;
  position: relative;
`;

const RefreshTimerWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ActionButtonsGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 649.95px) {
    flex-direction: column;
    align-items: flex-end;
  }
`;

const StyledGrid = styled.div`
  margin: 24px 0;
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

const PaginationButton = styled.button`
  padding: 8px 16px;
  margin: 0 4px;
`;

const ResultPerPageText = styled.div`
  padding: 8px 12px;
  font-family: Arial, Helvetica, sans-serif;
`;

const CountSelect = styled.select`
  width: 60px;
  display: block;
  margin: 0 8px 0 0;
`;

const FlexDiv = styled.div`
  display: flex;
  &.button-group {
    @media (max-width: 649.95px) {
      margin: 8px 0 0 0;
    }
  }
`;

const ButtonImage = styled.img`
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

  handlePageForward = () => {
    const { page } = this.context;
    this.context.dispatch({ type: UPDATE_PAGE, page: page + 1 });
    fetchPokemon({ ...this.context, page: page + 1 }, true);
  };

  handlePageBack = () => {
    const { page } = this.context;
    this.context.dispatch({ type: UPDATE_PAGE, page: page - 1 });
    fetchPokemon({ ...this.context, page: page - 1 }, true);
  };

  handleCountChange = (event) => {
    this.context.dispatch({
      type: UPDATE_ITEMS_PER_PAGE,
      itemsPerPage: event.target.value,
      page: 1,
    });
    // When the count is updated, lets reset the current page as well.
    fetchPokemon({ ...this.context, itemsPerPage: event.target.value, page: 1 });
  };

  handleSortAscending = () => {
    this.context.dispatch({ type: SORT_ASCENDING });
  };

  handleSortDescending = () => {
    this.context.dispatch({ type: SORT_DESCENDING });
  };

  checkPrevDisabled = () => {
    const { pokemonArray = [] } = this.context;
    const result = pokemonArray.some((pokemon) => pokemon.number === 1);
    if (result) return true;
    return false;
  };

  checkNextDisabled = () => {
    const { pokemonArray } = this.context;
    const result = pokemonArray.some((pokemon) => pokemon.number === lastPokemonNumber);
    if (result) return true;
    return false;
  };

  renderContent = () => {
    const { pokemonArray = [], isLoading, error, itemsPerPage } = this.context;
    if (isLoading) return <LoadingBanner />;

    if (error) return <ErrorBanner message={error} />;

    return (
      <StyledMain>
        <RefreshTimerWrapper>
          <RefreshTimer />
        </RefreshTimerWrapper>
        <ActionButtonsGroup>
          <FlexDiv className="select-group">
            <ResultPerPageText>Results Per Page</ResultPerPageText>
            <CountSelect
              name="pokemon-per-page"
              id="pokemon-per-page"
              onChange={this.handleCountChange}
              value={itemsPerPage}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={151}>151</option>
            </CountSelect>
          </FlexDiv>
          <FlexDiv className="button-group">
            <PaginationButton disabled={this.checkPrevDisabled()} onClick={this.handlePageBack}>
              Prev Page
            </PaginationButton>
            <PaginationButton disabled={this.checkNextDisabled()} onClick={this.handlePageForward}>
              Next Page
            </PaginationButton>
          </FlexDiv>
          <FlexDiv>
            <MinimalButton onClick={this.handleSortAscending}>
              <ButtonImage src="./ascending.svg" alt="Sort ascending" />
            </MinimalButton>
            <MinimalButton onClick={this.handleSortDescending}>
              <ButtonImage src="./descending.svg" alt="Sort descending" />
            </MinimalButton>
          </FlexDiv>
        </ActionButtonsGroup>
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

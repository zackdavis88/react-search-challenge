import { useEffect, useState } from 'react';
import ErrorBanner from './ErrorBanner';
import LoadingBanner from './LoadingBanner';
import { useParams } from 'react-router-dom';
import { fetchPokemonById, formatPokemonNumber, getTypeColor } from '../utils';
import styled, { css } from 'styled-components';

const MaxWidthContainer = styled.div`
  max-width: 1280px;
  margin: 24px auto 0px auto;
`;

const PokemonImage = styled.img`
  width: 360px;
  @media (max-width: 649.95px) {
    max-width: 360px;
    width: 100%;
    min-width: 0;
  }
`;

const StyledMain = styled.main`
  position: relative;
  padding: 32px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  background-color: #adadad;
  justify-content: center;
  -webkit-box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.75);
`;

const DataRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  margin: 0px 0px 36px 0px;
  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

const DataColumn = styled.div`
  width: 100%;
`;

const DataLabel = styled.div`
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 0px 0px 8px 0px;
`;

const DataValue = styled.div`
  text-align: center;
  font-size: 24px;
`;

const PokemonType = styled.div`
  display: inline-block;
  font-family: Arial, Helvetica, sans-serif;
  width: 100px;
  margin: auto;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid black;

  ${(props) => {
    const color = getTypeColor(props.pokeType);
    return css`
      background-color: ${color};
    `;
  }}
`;

const SpriteContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

const Sprite = styled.img`
  align-self: center;
`;

const PokemonPage = () => {
  const [pokemon, setPokemon] = useState(null);
  const [pageError, setPageError] = useState('');
  const { pokemonId } = useParams();

  useEffect(() => {
    const getPokemonData = async () => {
      const response = await fetchPokemonById(pokemonId);
      if (response.status === 404) {
        return setPageError('Pokemon not found');
      }

      const result = await response.json();
      setPokemon({
        imageUrl: result.sprites?.other?.['official-artwork']?.front_default,
        name: result.name,
        number: formatPokemonNumber(pokemonId),
        types: result.types,
        sprites: result.sprites,
      });
    };

    getPokemonData();
  }, [pokemonId]);

  const renderSprites = () => {
    const frontDefault = pokemon.sprites['front_default'];
    const backDefault = pokemon.sprites['back_default'];
    const frontShinyDefault = pokemon.sprites['front_shiny'];
    const backShinyDefault = pokemon.sprites['back_shiny'];

    return (
      <SpriteContainer>
        <Sprite src={frontDefault} alt="front sprite" />
        <Sprite src={backDefault} alt="back sprite" />
        <Sprite src={frontShinyDefault} alt="front shiny sprite" />
        <Sprite src={backShinyDefault} alt="back shiny sprite" />
      </SpriteContainer>
    );
  };

  const renderContent = () => {
    if (!pageError && pokemon === null) return <LoadingBanner />; // check for pokemon === null because that means we are still initializing the component's state.

    if (pageError) return <ErrorBanner message={pageError} />;

    return (
      <MaxWidthContainer>
        <StyledMain>
          <PokemonImage src={pokemon.imageUrl} alt="pokemon image" />
          <DataRow>
            <DataColumn>
              <DataLabel>Number</DataLabel>
              <DataValue>{pokemon.number}</DataValue>
            </DataColumn>
            <DataColumn>
              <DataLabel>Name</DataLabel>
              <DataValue>{pokemon.name}</DataValue>
            </DataColumn>
          </DataRow>
          <DataRow>
            <DataColumn>
              <DataLabel>Types</DataLabel>
              <DataValue>
                {pokemon.types?.map(
                  (item, index) =>
                    item.type && (
                      <DataRow key={index}>
                        <PokemonType pokeType={item.type.name}>{item.type.name}</PokemonType>
                      </DataRow>
                    )
                )}
              </DataValue>
            </DataColumn>
            <DataColumn>
              <DataLabel>Sprites</DataLabel>
              <DataValue>{pokemon.sprites ? renderSprites() : null}</DataValue>
            </DataColumn>
          </DataRow>
        </StyledMain>
      </MaxWidthContainer>
    );
  };

  return renderContent();
};

export default PokemonPage;

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatPokemonNumber } from '../utils';

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardContentWrapper = styled.div`
  border: 1px solid lightgray;
  border-radius: 8px;
  box-shadow: 0 3px 6px lightgray, 0 3px 6px;
  overflow: hidden;
  position: relative;
  width: 275px;
  height: 275px;
`;

const PokemonImage = styled.img`
  width: 100%;
`;

const NameWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  color: #feca1b;
  font-size: 15px;
  letter-spacing: 2px;
  padding: 8px 0px 8px 8px;
  background-color: #000000bf;
  width: 100%;
  text-transform: capitalize;
`;

const NumberWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  color: #feca1b;
  font-size: 20px;
  letter-spacing: 2px;
  background-color: #000000bf;
  width: 100%;
  padding: 8px 0px 0px 8px;
`;

export default class SearchCard extends React.PureComponent {
  render() {
    const { imageUrl, number, name } = this.props;

    return (
      <CardWrapper>
        <Link to={`/${number}`}>
          <CardContentWrapper>
            <PokemonImage src={imageUrl} alt="pokemon image" />
            <NumberWrapper>
              <div>{formatPokemonNumber(number)}</div>
            </NumberWrapper>
            <NameWrapper>{name}</NameWrapper>
          </CardContentWrapper>
        </Link>
      </CardWrapper>
    );
  }
}

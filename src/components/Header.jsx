import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  -webkit-box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.75);
  padding: 16px;
  background-color: #f44336;
`;

const StyledImage = styled.img`
  width: 200px;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Link to="/">
        <StyledImage
          src="https://cdn2.bulbagarden.net/upload/4/4b/Pok%C3%A9dex_logo.png"
          alt="pokedex"
        />
      </Link>
    </StyledHeader>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  border-bottom: 1px solid #efefef;
  padding: 16px;
`;

const StyledImage = styled.img`
  width: 110px;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Link to="/">
        <StyledImage src="./logo.svg" alt="match" />
      </Link>
    </StyledHeader>
  );
}

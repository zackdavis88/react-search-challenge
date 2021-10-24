import React from 'react';
import styled from 'styled-components';

const StyledH2 = styled.h2`
  text-align: center;
  padding: 20px;
  font-size: 50px;
  display: block;
  letter-spacing: 6px;
`;

const StyledDiv = styled.div`
  text-align: center;
`;

const NotFoundPage = () => {
  return (
    <>
      <StyledH2>Page Not Found</StyledH2>
      <StyledDiv>
        You can click the <em>PokeDex</em> logo to navigate home.
      </StyledDiv>
    </>
  );
};

export default NotFoundPage;

import React from 'react';
import styled from 'styled-components';

const StyledH2 = styled.h2`
  text-align: center;
  padding: 20px;
  font-size: 30px;
  display: block;
  letter-spacing: 6px;
`;

class ErrorBanner extends React.Component {
  render() {
    return <StyledH2>{this.props.message}</StyledH2>;
  }
}

export default ErrorBanner;

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.h2`
  background-color: red;
`;

class ErrorBanner extends React.Component {
  render() {
    return <Wrapper>{this.props.message}</Wrapper>;
  }
}

export default ErrorBanner;

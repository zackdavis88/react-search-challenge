import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  margin: 8px;

  ${(props) => {
    if (!props.additionalStyles) return false;

    // any additional styles passed to the component should be reduced to a string of css styles.
    return css`
      ${Object.keys(props.additionalStyles).reduce((prev, property) => {
        return prev.concat(`${property}: ${props.additionalStyles[property]};`);
      }, '')}
    `;
  }}
`;

function MinimalButton({ children, onClick, style, ...props }) {
  return (
    <StyledButton {...props} onClick={onClick} additionalStyles={style}>
      {children}
    </StyledButton>
  );
}

export default MinimalButton;

import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ProfileContext, TOGGLE_REFRESH } from './ProfilesContextProvider';
import { fetchProfiles } from '../utils';

const RefreshTimerText = styled.div`
  margin: 16px;
`;

// Wanted something a little more flashy than a standard checkbox, so I tweaked this example from w3schools:
// https://www.w3schools.com/howto/howto_css_switch.asp
const StyledCheckBox = styled.label`
  position: relative;
  display: inline-block;
  min-width: 60px;
  min-height: 34px;
  max-width: 60px;
  max-height: 34px;
  margin: 8px;

  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  & > .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 250ms;
    transition: 250ms;
  }

  & > .slider:before {
    position: absolute;
    content: '';
    min-height: 26px;
    min-width: 26px;
    max-height: 26px;
    max-width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 250ms;
    transition: 250ms;
  }

  & > input:checked + .slider {
    background-color: #1927f0;
  }

  & > input:focus + .slider {
    box-shadow: 0 0 1px #1927f0;
  }

  & > input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

const RefreshTimer = () => {
  const profileContext = useContext(ProfileContext);
  const { autoRefresh, dispatch } = profileContext;
  const [secondsRemaining, setSecondsRemaining] = useState(10);
  const toggleAutoRefresh = () => {
    // lets reset secondsRemaining if we are ON -> OFF.
    if (autoRefresh) setSecondsRemaining(10);
    return dispatch({ type: TOGGLE_REFRESH });
  };

  useEffect(() => {
    if (!autoRefresh) return; // Bail out of creating a timer if autoRefresh is false.

    const timer = setTimeout(() => {
      if (secondsRemaining === 1) {
        fetchProfiles(profileContext, true);
        setSecondsRemaining(10);
      } else {
        setSecondsRemaining(secondsRemaining - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsRemaining, autoRefresh, profileContext]);

  return (
    <>
      <RefreshTimerText>
        {autoRefresh ? `Auto Refresh in ${secondsRemaining}s` : `Auto Refresh is OFF`}
      </RefreshTimerText>
      <StyledCheckBox>
        <input type="checkbox" checked={autoRefresh} readOnly />
        <span className="slider" onClick={toggleAutoRefresh}></span>
      </StyledCheckBox>
    </>
  );
};

export default RefreshTimer;

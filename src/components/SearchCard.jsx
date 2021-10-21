import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AvatarWrapper = styled.div`
  border: 1px solid lightgray;
  border-radius: 8px;
  box-shadow: 0 3px 6px lightgray, 0 3px 6px;
  overflow: hidden;
  position: relative;
  width: 200px;
  height: 200px;
`;

const DetailsDiv = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  border-radius: inherit;
  overflow: hidden;
`;

const DetailsFlexOutterWrapper = styled.div`
  margin: 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
`;

const DetailsFlexInnerWrapper = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledH6 = styled.h6`
  font-size: 16px;
`;

const HandleWrapper = styled.div`
  display: flex;
  margin-bottom: 4px;
  align-items: center;
`;

const BottomDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const AgeAndLocationWrapper = styled.div`
  display: flex;
  margin-bottom: 4px;
  align-items: center;
`;

const PhotoCountWrapper = styled.div`
  display: inline-block;
  height: 15px;
  margin-right: 4px;
  color: white;
`;

export default class Search extends React.PureComponent {
  render() {
    const {
      photoUrl = '',
      handle = '',
      location = '',
      age = 99,
      photoCount = 0,
      profileId,
    } = this.props;

    return (
      <CardWrapper>
        <Link to={`/${profileId}`}>
          <AvatarWrapper>
            <img src={photoUrl} alt="potential date"></img>
            <DetailsDiv>
              <DetailsFlexOutterWrapper>
                <DetailsFlexInnerWrapper>
                  <StyledH6>
                    <HandleWrapper>{handle}</HandleWrapper>
                  </StyledH6>
                  <BottomDetailsWrapper>
                    <AgeAndLocationWrapper>
                      {location ? `${age} • ${location}` : age}
                    </AgeAndLocationWrapper>
                    <PhotoCountWrapper>{photoCount > 1 && `${photoCount}`}</PhotoCountWrapper>
                  </BottomDetailsWrapper>
                </DetailsFlexInnerWrapper>
              </DetailsFlexOutterWrapper>
            </DetailsDiv>
          </AvatarWrapper>
        </Link>
      </CardWrapper>
    );
  }
}

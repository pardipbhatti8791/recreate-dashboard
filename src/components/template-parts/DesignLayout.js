import React, { Fragment } from 'react';
import styled from 'styled-components';
import MainHeader from './header';

class DesignLayout extends React.Component {
  render() {
    return (
      <Fragment>
        <MainHeader />
        <MainWrapper >
          <MainContent id='scrollable-container'>{this.props.children}</MainContent>
        </MainWrapper>
      </Fragment>
    );
  }
}

export default DesignLayout;

const MainWrapper = styled.div`
  padding-top: 60px;
  display: flex;
  background: rgb(241, 243, 246);
`;
const MainContent = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  background: #fff;
  overflow-y: auto;
`;

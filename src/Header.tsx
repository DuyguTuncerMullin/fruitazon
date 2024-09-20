import { Component } from 'react';
import styled from '@emotion/styled';

const HeaderContainer = styled.div({
  backgroundColor: '#2c365e',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: 'white',
  height: 63,
  top: 0,
  left: 0,
  position: 'fixed',
  width: '100%',
  borderTop: `3px solid orange`,
  borderBottom: `1px solid black`,
  zIndex: 1200,
});

const BrandName = styled.div({
  fontSize: '20px',
  marginLeft: '20px',
});

const Actions = styled.div({
  marginRight: '20px',
});

export default class Header extends Component {
  render() {
    return (
      <HeaderContainer>
        <BrandName>Fruitazon</BrandName>
        <Actions>
          <span>
            <span aria-label="cart" role="img">
              🛒
            </span>{' '}
            Cart
          </span>
        </Actions>
      </HeaderContainer>
    );
  }
}

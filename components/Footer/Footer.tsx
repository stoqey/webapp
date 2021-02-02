import React from 'react';
import Container from '../UiElements/Container/Container';
import FooterWrapper, { Text } from './Footer.styled';

const Footer: React.FC<{}> = () => {
  return (
    <FooterWrapper>
      <Container>
        <Text>Stoqey ©{new Date().getFullYear()} Created by Stoqey, Inc</Text>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;

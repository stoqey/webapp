import React from 'react';
import { Block } from 'baseui/block';
import { Grid, Cell } from 'baseui/layout-grid';
import Container from '../UiElements/Container/Container';
import FooterWrapper, { Text } from './Footer.styled';

const Footer: React.FC<{}> = () => {
  return (
    <FooterWrapper>
      <Container>
        <Text>Stoqey ©{new Date().getFullYear()} Created by Stoqey, Inc</Text>
      </Container>
      <Grid gridColumns={12} gridGutters={0} gridMargins={0}>
        <Cell span={[12, 12, 3]}>
          <div style={{ background: 'blue', height: '100px' }} />
        </Cell>
        <Cell span={[12, 12, 3]}>
          <div style={{ background: 'green', height: '100px' }} />
        </Cell>
        <Cell span={[12, 12, 3]}>
          <div style={{ background: 'green', height: '100px' }} />
        </Cell>
        <Cell span={[12, 12, 3]}>
          <div style={{ background: 'green', height: '100px' }} />
        </Cell>
      </Grid>
    </FooterWrapper>
  );
};

export default Footer;

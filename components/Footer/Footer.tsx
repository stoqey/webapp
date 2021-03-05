import React from 'react';
import { Block } from 'baseui/block';
import { Grid, Cell } from 'baseui/layout-grid';
import Container from '../UiElements/Container/Container';
import FooterWrapper, { Text } from './Footer.styled';
import StqRoboIcon from '../logo/icon';
import { Paragraph1, Paragraph2, Paragraph3, Paragraph4 } from 'baseui/typography';
import SvgIcon from '../UiElements/SvgIcon/SvgIcon';
import Logo from '../UiElements/Logo/Logo';

const Footer: React.FC<{}> = () => {
  return (
    <FooterWrapper>
      <Container>
        <Text>Stoqey ©{new Date().getFullYear()} Created by Stoqey, Inc</Text>
      </Container>
      <Grid gridColumns={12} gridGutters={0} gridMargins={0}>
        <Cell span={[12, 12, 3]}>
          <div>
            <p style={{ display: "flex", justifyContent: "center" }}>
              <StqRoboIcon />
              <Logo
                path="/"
                src={
                  <SvgIcon
                    src={require('assets/images/logo.svg?include')}
                  />
                }
              />
            </p>
            <p style={{ textAlign: 'center' }}>
              <Paragraph3>Copyright © {new Date().getFullYear()} Stoqey Inc.</Paragraph3>
              <Paragraph3>All rights reserved.</Paragraph3>
            </p>

          </div>

          <div style={{ height: "50px" }}></div>
        </Cell>
        <Cell span={[12, 12, 3]}>
          <div style={{ background: 'green', height: '100px' }} />
        </Cell>
        <Cell span={[12, 12, 3]}>
          <div>

          </div>
        </Cell>
        <Cell span={[12, 12, 3]}>
          <div style={{ background: 'green', height: '100px' }} />
        </Cell>
      </Grid>
    </FooterWrapper>
  );
};

export default Footer;

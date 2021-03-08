import React from 'react';
import { Block } from 'baseui/block';
import { Grid, Cell } from 'baseui/layout-grid';
import Container from '../UiElements/Container/Container';
import FooterWrapper, { Text } from './Footer.styled';
import StqRoboIcon from '../logo/icon';
import { Paragraph1, Paragraph2, Paragraph3, Paragraph4 } from 'baseui/typography';
import SvgIcon from '../UiElements/SvgIcon/SvgIcon';
import Logo from '../UiElements/Logo/Logo';
import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer: React.FC<{}> = () => {
  return (
    <FooterWrapper>
      <Container>
        <Text></Text>
      </Container>
      <Grid gridColumns={12} gridGutters={0} gridMargins={0}>
        <Cell span={[12, 12, 4]}>
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <StqRoboIcon />
              <Logo
                path="/"
                src={
                  <SvgIcon
                    src={require('assets/images/logo.svg?include')}
                  />
                }
              />
            </div>
            <p style={{ textAlign: 'center' }}>
              <Paragraph4>Copyright © {new Date().getFullYear()} Stoqey Inc. All rights reserved</Paragraph4>
            </p>

          </div>

          <div style={{ height: "50px" }}></div>
        </Cell>
        <Cell span={[12, 12, 2]}>
          <div style={{ background: 'green', height: '100px' }} />
          <FaGithub size={25} />
          <FaTwitter size={25} />
          <FaInstagram size={25} />
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

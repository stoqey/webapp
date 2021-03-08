import React from 'react';
import { Block } from 'baseui/block';
import { Grid, Cell } from 'baseui/layout-grid';
import Container from '../UiElements/Container/Container';
import FooterWrapper, { Text, StatusWrapper, StatusText, StoqeyWords } from './Footer.styled';
import StqRoboIcon, { StoqeyWordsLogo } from '../logo/icon';
import { Paragraph1, Paragraph2, Paragraph3, Paragraph4 } from 'baseui/typography';
import SvgIcon from '../UiElements/SvgIcon/SvgIcon';
import Logo from '../UiElements/Logo/Logo';
import { FaCircle, FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { RiLightbulbFlashFill } from 'react-icons/ri';

const Footer: React.FC<{}> = () => {
  const icons = [
    { name: 'Github', Icon: FaGithub, link: 'https://twitter.com/stoqey_' },
    { name: 'LinkedIn', Icon: FaLinkedinIn, link: 'https://linkedin.com/in/stoqey' },
    { name: 'Instagram', Icon: FaInstagram, link: 'https://instagram.com/stoqey' },
  ];

  return (
    <FooterWrapper>
      <Container>
        <Text></Text>
      </Container>

      {/* Logo grid */}
      <Grid gridColumns={12} gridGutters={0} gridMargins={0}>
        <Cell span={[12, 12, 4]}>
          <div style={{ display: "flex", justifyContent: "center", alignContent: 'center' }}>
            <StqRoboIcon />
            <StoqeyWords>STOQEY</StoqeyWords>
          </div>
        </Cell>
      </Grid>

      <Grid gridColumns={12} gridGutters={0} gridMargins={0}>
        <Cell span={[12, 12, 4]}>
          <div>
            <p style={{ textAlign: 'center' }}>
              <Paragraph3>Copyright © {new Date().getFullYear()} Stoqey Inc. All rights reserved</Paragraph3>
            </p>
          </div>
        </Cell>
        <Cell span={[12, 12, 2]}>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {icons.map(i => {
              const { Icon, link, name } = i;
              return (
                <Block
                  key={name}
                  as="a"
                  target="_blank"
                  alt={name}
                  href={link}
                  overrides={{
                    Block: {
                      style: ({ $theme }) => {
                        return {
                          padding: '5px',
                          color: $theme.colors.contentSecondary,
                          ':hover': {
                            color: $theme.colors.primary,
                          }
                        };
                      },
                    },
                  }}
                >
                  <Icon size={25} />
                </Block>
              )
            })}
          </div>
        </Cell>
        <Cell span={[12, 12, 2]}>

          {/* <div
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <StatusWrapper>
              <StatusText> Status: All systems normal</StatusText>
            </StatusWrapper>
          </div> */}
        </Cell>
        <Cell span={[12, 12, 3]} >
          <Block
            overrides={{
              Block: {
                style: ({ $theme }) => {
                  return {
                    color: $theme.colors.contentSecondary,
                    ':hover': {
                      color: $theme.colors.primary,
                    },
                    display: 'flex',
                    justifyContent: 'center',
                  };
                },
              },
            }}
          >
            <RiLightbulbFlashFill size={27} />
          </Block>

        </Cell>

      </Grid>
    </FooterWrapper>
  );
};

export default Footer;

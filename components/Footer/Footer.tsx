import React from 'react';
import { Block } from 'baseui/block';
import { Grid, Cell } from 'baseui/layout-grid';
import {
  useThemeSwitcherCtx,
  THEME,
} from 'contexts/theme/theme.provider';
import Container from '../UiElements/Container/Container';
import FooterWrapper, { Text, StatusWrapper, StatusText, StoqeyWords } from './Footer.styled';
import StqRoboIcon, { StoqeyWordsLogo } from '../logo/icon';
import { Paragraph1, Paragraph2, Paragraph3, Paragraph4 } from 'baseui/typography';
import SvgIcon from '../UiElements/SvgIcon/SvgIcon';
import Logo from '../UiElements/Logo/Logo';
import { FaCircle, FaGithub, FaInstagram, FaLinkedinIn, FaRedditAlien, FaTwitter } from 'react-icons/fa';
import { RiLightbulbFlashFill } from 'react-icons/ri';
import { Button } from 'baseui/button';

const Footer: React.FC<{}> = () => {

  const { theme, setTheme } = useThemeSwitcherCtx();

  const icons = [
    { name: 'Reddit', Icon: FaRedditAlien, link: 'https://www.reddit.com/r/stoqey/' },
    { name: 'Github', Icon: FaGithub, link: 'https://github.com/stoqey' },
    { name: 'Twitter', Icon: FaTwitter, link: 'https://twitter.com/stoqey_' },
    { name: 'Instagram', Icon: FaInstagram, link: 'https://instagram.com/stoqey' },
    { name: 'LinkedIn', Icon: FaLinkedinIn, link: 'https://linkedin.com/company/stoqey' }
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
            <Paragraph3 $style={{ textAlign: 'center' }}>
              Copyright © {new Date().getFullYear()} Stoqey Inc. All rights reserved
            </Paragraph3>
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
                  // @ts-ignore
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
                  <Icon size={23} />
                </Block>
              )
            })}
          </div>
        </Cell>
        <Cell span={[12, 12, 4]}>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {/* <StatusWrapper>
              <StatusText> Status: All systems normal</StatusText>
            </StatusWrapper> */}
            <Paragraph3>
              support@stoqey.com
          </Paragraph3>
          </div>


        </Cell>
        <Cell span={[12, 12, 1]} >
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
                    justifyContent: 'flex-end',
                  };
                },
              },
            }}
          >
            <Button kind="tertiary" size="mini"
              onClick={() => {
                let getTheme = theme === THEME.light ? THEME.dark : THEME.light;
                setTheme(getTheme);
                localStorage.setItem('theme', getTheme);
              }}
            >
              <RiLightbulbFlashFill size={27} />
            </Button>

          </Block>

        </Cell>

      </Grid>
    </FooterWrapper>
  );
};

export default Footer;

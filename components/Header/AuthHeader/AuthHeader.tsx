import React from 'react';
import Router from 'next/router';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import Logo from '../../UiElements/Logo/Logo';
import SvgIcon from '../../UiElements/SvgIcon/SvgIcon';
import Container from '../../UiElements/Container/Container';
import StqRoboIcon from '@/components/logo/icon';
import { CurrencyNumberContainer } from 'containers/Currency/CurrencyNumber';
import { SpaceBetween } from '@/components/PageStyles/Settings.styled';

type AuthHeaderType = {
  pathname?: string;
};

const AuthHeader = ({ pathname }: AuthHeaderType) => {

  const LoginButtons = () => {
    return (
      <Block>
        <Button
          shape="pill"
          // disabled={pathname === '/login'}
          onClick={() => Router.push('/login')}
          overrides={{
            BaseButton: {
              style: ({ $theme }) => {
                return {
                  ...$theme.typography.font350,
                  backgroundImage: `linear-gradient(to right, rgb(75, 161, 216), rgb(68, 100, 189) 95%);`
                };
              },
            },
          }}
        >
          Start investing
        </Button>
      </Block>
    )
  };

  return (
    <Container>
      <Block
        overrides={{
          Block: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: pathname === '/login'? "center" : "space-between",
              padding: '23px 0',
            },
          },
        }}
      >

        <Logo
          path={'/'}
          src={
            <>
              <StqRoboIcon />
              <CurrencyNumberContainer />
            </>
          }
        />

        {pathname !== '/login' &&  <LoginButtons />}

      </Block>
    </Container>
  );
};

export default AuthHeader;

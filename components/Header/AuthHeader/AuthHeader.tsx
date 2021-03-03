import React from 'react';
import Router from 'next/router';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import Logo from '../../UiElements/Logo/Logo';
import SvgIcon from '../../UiElements/SvgIcon/SvgIcon';
import Container from '../../UiElements/Container/Container';
import StqRoboIcon from '@/components/logo/icon';
import { CurrencyNumberContainer } from 'containers/Currency/CurrencyNumber';

type AuthHeaderType = {
  pathname?: string;
};

const AuthHeader = ({ pathname }: AuthHeaderType) => {
  return (
    <Container>
      <Block
        overrides={{
          Block: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '23px 0',
            },
          },
        }}
      >
        <Logo
          path={pathname}
          src={
            <>
              <StqRoboIcon />
              <CurrencyNumberContainer />
            </>
          }
        />

        {pathname !== '/login' && (
          <Block>
            <Button
              kind="minimal"
              disabled={pathname === '/login'}
              onClick={() => Router.push('/login')}
              overrides={{
                BaseButton: {
                  style: ({ $theme }) => {
                    return {
                      ...$theme.typography.font250,
                      ':disabled': {
                        backgroundColor: 'transparent',
                      },
                    };
                  },
                },
              }}
            >
              Login
            </Button>
            <Button
              disabled={pathname === '/login'}
              onClick={() => Router.push('/login')}
              overrides={{
                BaseButton: {
                  style: ({ $theme }) => {
                    return {
                      ...$theme.typography.font250,
                    };
                  },
                },
              }}
            >
              Join Free
            </Button>
          </Block>
        )}

      </Block>
    </Container>
  );
};

export default AuthHeader;

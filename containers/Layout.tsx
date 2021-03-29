import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { Amplitude, LogOnMount } from '@amplitude/react-amplitude';
import { useAmplitude } from 'react-amplitude-hooks';
import Footer from 'components/Footer/Footer';
import dynamic from 'next/dynamic';
import AppWrapper, { ContentWrapper } from 'components/Layout/Layout.styled';
import { useThemeSwitcherCtx, THEME } from 'contexts/theme/theme.provider';

const LayoutHeader = dynamic(() => import('components/Layout/Layout.header'), {
  ssr: false,
});


const Layout: React.FunctionComponent<{ router?: any }> = ({
  router,
  children,
}) => {
  const pathname = router.pathname;

  const { theme } = useThemeSwitcherCtx();

  let layoutBg = '#ffffff';

  if (theme === THEME.dark) {
    layoutBg = '#000000';
  }

  if (
    (theme === THEME.light && pathname === '/') ||
    (theme === THEME.light && pathname === '/chat')
  ) {
    layoutBg = '#fcfcfc';
  }

  if (
    (theme === THEME.dark && pathname === '/') ||
    (theme === THEME.dark && pathname === '/chat')
  ) {
    layoutBg = '#0c0c0c';
  }

  const LayoutComponent = () => {
    return (
      <AppWrapper className={theme} style={{ backgroundColor: layoutBg }}>
        <LayoutHeader />
        <ContentWrapper>{children}</ContentWrapper>
        <Footer />
      </AppWrapper>
    );
  }

  if (process.browser) {
    return (
      <Amplitude
        eventProperties={(inheritedProps) => ({
          ...inheritedProps,
          scope: 'webapp',
          // eventName,
        })}
      >
        {() => <>
          <LogOnMount eventType={`WEB:${pathname}`} />
          <LayoutComponent />
        </>}
      </Amplitude>
    );
  }

  return <LayoutComponent />


};

export default withRouter(Layout);

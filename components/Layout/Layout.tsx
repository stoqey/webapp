import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import Footer from 'components/Footer/Footer';
import AppWrapper, { ContentWrapper } from './Layout.styled';
import { useThemeSwitcherCtx, THEME } from 'contexts/theme/theme.provider';

import dynamic from 'next/dynamic';
const LayoutHeader = dynamic(() => import('./Layout.header'), {
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

  return (
    <AppWrapper className={theme} style={{ backgroundColor: layoutBg }}>
      <LayoutHeader />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </AppWrapper>
  );
};

export default withRouter(Layout);

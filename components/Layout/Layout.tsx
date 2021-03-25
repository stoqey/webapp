import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import AuthHeader from 'components/Header/AuthHeader/AuthHeader';
import AppWrapper, { ContentWrapper } from './Layout.styled';
import { useThemeSwitcherCtx, THEME } from 'contexts/theme/theme.provider';
import { useUserInfo } from 'hooks/useUserInfo';
import AsyncStorageDB from '@/lib/AsyncStorageDB';

const Layout: React.FunctionComponent<{ router?: any }> = ({
  router,
  children,
}) => {
  const pathname = router.pathname;

  const db = AsyncStorageDB;

  const { theme } = useThemeSwitcherCtx();

  const { user } = useUserInfo();
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    db.getAuthItem().then(dbData => setCurrentUser(dbData as any));
  }, [pathname]);

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
      {!currentUser ? (
        <AuthHeader pathname={pathname} />
      ) : (
        <Header />
      )}

      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </AppWrapper>
  );
};

export default withRouter(Layout);

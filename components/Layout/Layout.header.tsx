import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import Header from 'components/Header/Header';
import AuthHeader from 'components/Header/AuthHeader/AuthHeader';
import { useUserInfo } from 'hooks/useUserInfo';
import AsyncStorageDB from '@/lib/AsyncStorageDB';

const LayoutHeader: React.FunctionComponent<{ router?: any }> = ({
  router,
}) => {
  const pathname = router.pathname;
  const db = AsyncStorageDB;

  const { user } = useUserInfo();
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    db.getAuthItem().then(dbData => setCurrentUser(dbData as any));
  }, [pathname]);

  return !currentUser ? (
    <AuthHeader pathname={pathname} />
  ) : (
    <Header />
  );
};

export default withRouter(LayoutHeader);

import { useState } from 'react';
import { LoginResponseType } from '@stoqey/client-graphql'
import AsyncStorageDB from 'lib/AsyncStorageDB';

/**
 * Use userInfo
 */
export function useUserInfo(): LoginResponseType {
  const db = AsyncStorageDB;

  const [userInfo, setUserInfo] = useState<LoginResponseType>(null);

  if (!userInfo) {
    db.getAuthItem().then(dbData => setUserInfo(dbData));
  }

  return !userInfo ? ({} as any) : userInfo;
}

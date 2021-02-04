import { useState, useEffect} from 'react';
import { LoginResponseType } from '@stoqey/client-graphql'
import AsyncStorageDB from 'lib/AsyncStorageDB';

/**
 * Use userInfo
 */
export function useUserInfo(): LoginResponseType {
  const db = AsyncStorageDB;

  const [userInfo, setUserInfo] = useState<LoginResponseType>(null);

  useEffect(() => {
    if (!userInfo) {
      db.getAuthItem().then(dbData => setUserInfo(dbData));
    }  
  }, [userInfo])
  
  return !userInfo ? ({} as any) : userInfo;
}

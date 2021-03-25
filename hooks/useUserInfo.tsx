import { useState, useEffect} from 'react';
import { LoginResponseType } from '@stoqey/client-graphql'
import AsyncStorageDB from 'lib/AsyncStorageDB';
import { APPEVENTS, AppEvents } from '@/lib/AppEvent';

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

export function fetchUserInfo(): void {
  const db = AsyncStorageDB;
  const events = AppEvents.Instance;
  db.getAuthItem().then(dbData => events.emit(APPEVENTS.AUTH, dbData)).catch(error => console.error(error));
}

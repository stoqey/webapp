import isEmpty from 'lodash/isEmpty';
import { LoginResponseType } from '@stoqey/client-graphql'

export const USER_DB_PATH = 'USER_DB_PATH';

export interface UserAuthObject {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;

  accessToken: string;
  refreshToken: string;
  expirationTime?: string;
  balance: number;
  currency: string;
}

// Require cycle:
export const JSONDATA = (data: any): Record<string, any> | string | null => {
  if (isEmpty(data) || !data) {
    return null;
  }

  try {
    if (typeof data !== 'object') {
      return JSON.parse(data);
    }
    return data;
  } catch (error) {
    console.error(error);
    return data;
  }
};


const getItem =  async (key:string): Promise<any> => {
  const item = await localStorage.getItem(key);
  return JSONDATA(item);
}

const setItem = async function (key: string, value: Record<string, any>) {
  await null;
  return localStorage.setItem(key, JSON.stringify(value));
}

const getAuthItem =  async (): Promise<LoginResponseType> => {
  const item = await localStorage.getItem(USER_DB_PATH);
  return JSONDATA(item) as LoginResponseType;
}

export const getAuthToken = async (): Promise<string> => {
  const user = await getAuthItem();
  return user && user.accessToken;
}

const updateAuthItem = async (data: any) => {
  try {
    const existingData = await getAuthItem();

    const newState = {
      ...(existingData || {}),
      ...data,
    };
  
    await setItem(USER_DB_PATH, newState);

    return newState;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const deleteItem = async (path:string): Promise<any> => localStorage.removeItem(path);

const deleteAuthItem = async (): Promise<any> => localStorage.removeItem(USER_DB_PATH);

export const AsyncStorageDB = {
  getItem,
  setItem,
  getAuthItem,
  updateAuthItem,
  deleteItem,
  getAuthToken,
  deleteAuthItem
};

export default AsyncStorageDB;

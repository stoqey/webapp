interface ProviderData {
  uid: string;
  displayName?: any;
  photoURL?: any;
  email?: any;
  phoneNumber: string;
  providerId: string;
}

interface StsTokenManager {
  apiKey: string;
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
}

interface MultiFactor {
  enrolledFactors: any[];
}

interface User {
  uid: string;
  displayName?: any;
  photoURL?: any;
  email?: any;
  emailVerified: boolean;
  phoneNumber: string;
  isAnonymous: boolean;
  tenantId?: any;
  providerData: ProviderData[];
  apiKey: string;
  appName: string;
  authDomain: string;
  stsTokenManager: StsTokenManager;
  redirectEventId?: any;
  lastLoginAt: string;
  createdAt: string;
  multiFactor: MultiFactor;
}

interface AdditionalUserInfo {
  providerId: string;
  isNewUser: boolean;
}

export interface PhoneAuthResults {
  user: User;
  credential?: any;
  operationType: string;
  additionalUserInfo: AdditionalUserInfo;
}

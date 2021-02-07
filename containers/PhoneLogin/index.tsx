import React from 'react';
import firebaseConfig from 'keys/firebase.config';
import router from 'next/router'
import _, { isEmpty } from 'lodash';
import * as firebaseui from "firebaseui";
import firebase from "firebase";
import { PhoneAuthResults } from './firebase.phonauthresults';
import { useApolloClient } from '@apollo/client';
import { phoneLoginApi, PhoneAuthCreds } from './api';
import AsyncStorageDB, { JSONDATA } from '@/lib/AsyncStorageDB';
import { useUserInfo } from 'hooks/useUserInfo';

export const PhoneLogin = () => {

  const db = AsyncStorageDB;
  const client = useApolloClient();

  const phoneLoginApiCall = (args: PhoneAuthCreds): Promise<any> => phoneLoginApi({
    args,
    client,
    error: async (error) => {
      // Show error


    },
    success: async (data) => {
      // save login data in client browser
      await db.updateAuthItem(data);
      await router.push('/home');
      // send send user to home
    }
  });

  if (firebase.apps.length <= 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const uiConfig = {
    signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
    // Terms of service url.
    tosUrl: "/tos",
    // Privacy policy url.
    privacyPolicyUrl: "/privacy",

    // Opens IDP Providers sign-in flow in a popup.
    // signInFlow: "popup",
    callbacks: {
      // Called when the user has been successfully signed in.
      signInSuccessWithAuthResult: function (authResult: PhoneAuthResults, redirectUrl) {


        if (authResult.user) {
          console.log('login', JSON.stringify(authResult))

          const resData: PhoneAuthResults = JSONDATA(JSON.stringify(authResult)) as any;
          console.log('login', resData)
          const phone =  resData.user.phoneNumber // _.get(authResult, 'user.phoneNumber', '');
          const firebaseToken = resData.user.stsTokenManager.accessToken // _.get(authResult, 'user.stsTokenManager.accessToken', '');
      
          let createNew: boolean = false;
          if(resData.additionalUserInfo && resData.additionalUserInfo.isNewUser){
            createNew = resData.additionalUserInfo.isNewUser;
          }
  
          // Login without creating new account
          phoneLoginApiCall({
            phone,
            firebaseToken,
            createNew
          });

        } else {
          // Show error from here
        }
        
        // Do not redirect.
        return false;
      }
    },
  };

  React.useEffect(() => {

    const ui = new firebaseui.auth.AuthUI(firebase.auth());

    async function checkIfUserExists() {
      const user = await AsyncStorageDB.getAuthItem();
      if(isEmpty(user && user.accessToken)){
        ui.start("#firebaseui-auth-container", uiConfig)
      }
    }
    checkIfUserExists();
    return () => { ui.delete() }
  }, []);

  return (
    <div id="firebaseui-auth-container"></div>
  )
}

export default PhoneLogin;
import React from 'react';
import firebaseConfig from 'keys/config';
import _ from 'lodash';
import * as firebaseui from "firebaseui";
import firebase from "firebase";
import { PhoneAuthResults } from './firebase.phonauthresults';
import { useApolloClient } from '@apollo/client';
import { phoneLoginApi, PhoneAuthCreds } from './api';

export const PhoneLogin = (props: Props) => {

  const client = useApolloClient();

  const phoneLoginApiCall = (args: PhoneAuthCreds): Promise<any> => phoneLoginApi({
    args,
    client,
    error: async () => {

    },
    success: async () => {
      // TODO save login todata in client browser
      // 
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
          const phone = _.get(authResult, 'user.phoneNumber', '');
          const firebaseToken = _.get(authResult, 'user.stsTokenManager.accessToken', '');
          const createNew: boolean = _.get(authResult, 'additionalUserInfo.isNewUser', false);

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
    ui.start("#firebaseui-auth-container", uiConfig)
    return () => { ui.delete() }
  }, []);

  return (
    <div id="firebaseui-auth-container"></div>
  )
}

export default PhoneLogin;
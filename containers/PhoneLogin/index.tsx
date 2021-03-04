import React from 'react';
import firebaseConfig from 'keys/firebase.config.json';
import router from 'next/router';
import { toaster } from 'baseui/toast';
import { Button } from 'baseui/button';
import { isEmpty } from 'lodash';
import * as firebaseui from "firebaseui";
import firebase from "firebase";
import { PhoneAuthResults } from './firebase.phonauthresults';
import { useApolloClient } from '@apollo/client';
import { phoneLoginApi, PhoneAuthCreds } from './api';
import AsyncStorageDB, { JSONDATA } from '@/lib/AsyncStorageDB';
import Toaster from '@/components/UiElements/Toaster/Toaster';
import { PhoneInput, SIZE } from "baseui/phone-input";
import { PinCode } from "baseui/pin-code";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import config from 'keys/firebase.config.json';


export const PhoneLogin = () => {

  const [country, setCountry] = React.useState(undefined);
  const [phone, setPhone] = React.useState("");
  const [codes, setCodes] = React.useState([
    "",
    "",
    "",
    "",
    "",
    ""
  ]);

  let ui: firebaseui.auth.AuthUI = null;
  let toastKey = null;
  const db = AsyncStorageDB;
  const client = useApolloClient();

  const phoneLoginApiCall = (args: PhoneAuthCreds): Promise<any> => phoneLoginApi({
    args,
    client,
    error: async (error) => {
      const message = error && error.message;
      // Show error
      toastKey = toaster.negative(<>{message}</>, {
        autoHideDuration: 2500
      });

      return setTimeout(() => {
        router.reload();
      }, 2500);
    },
    success: async (data) => {

      toastKey = toaster.positive(<>Successfully logged in using phone</>, {
        autoHideDuration: 4000
      });

      // save login data in client browser
      await db.updateAuthItem(data);
      await router.push('/portfolio');
      // send send user to home
    }
  });

  // if (firebase.apps.length <= 0) {
  //   firebase.initializeApp(firebaseConfig);
  // }

  const uiConfig = {
    signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
    // Terms of service url.
    tosUrl: "/terms",
    // Privacy policy url.
    privacyPolicyUrl: "/privacy",

    // Opens IDP Providers sign-in flow in a popup.
    // signInFlow: "popup",
    callbacks: {
      // Called when the user has been successfully signed in.
      signInSuccessWithAuthResult: function (authResult: PhoneAuthResults, redirectUrl) {

        if (authResult.user) {
          // console.log('login', JSON.stringify(authResult))
          const resData: PhoneAuthResults = JSONDATA(JSON.stringify(authResult)) as any;
          // console.log('login', resData)
          const phone = resData.user.phoneNumber // _.get(authResult, 'user.phoneNumber', '');
          const firebaseToken = resData.user.stsTokenManager.accessToken // _.get(authResult, 'user.stsTokenManager.accessToken', '');

          let createNew: boolean = false;
          if (resData.additionalUserInfo && resData.additionalUserInfo.isNewUser) {
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
          toastKey = toaster.negative(<>Error logging in with phone number, please try again</>, {
            autoHideDuration: 6000
          })
        }

        // Do not redirect.
        return false;
      }
    },
  };

  React.useEffect(() => {

    // check if firebase ui exists
    // if (firebaseui.auth.AuthUI.getInstance()) {
    //   ui = firebaseui.auth.AuthUI.getInstance()
    // } else {
    //   ui = new firebaseui.auth.AuthUI(firebase.auth())
    // }

    async function checkIfUserExists() {
      const user = await AsyncStorageDB.getAuthItem();
      if (isEmpty(user && user.accessToken)) {
        ui.start("#firebaseui-auth-container", uiConfig)
      }
    }
    // checkIfUserExists();
    // return () => {
    //   ui.delete()
    // }
  }, []);

  console.log('phone number is', {
    phone, country
  })

  return (
    <>
      <Toaster toastKey={toastKey} />

      <FirebaseAuthProvider {...config} firebase={firebase}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', padding: '20px' }}>

          <PhoneInput
            country={country}
            onCountryChange={({ option }) => setCountry(option)}
            text={phone}
            onTextChange={e => setPhone(e.currentTarget.value)}
            size={SIZE.default}
            clearable
          />

          <PinCode
            values={codes}
            onChange={({ values }) => setCodes(values)}
            clearOnEscape
          />

          <Button
            size="large"
            shape="pill"
            onClick={() => { }}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => {
                  return {
                    margin: '15px',
                    width: '60%',
                    ...$theme.typography.font450,
                  };
                },
              },
            }}
          > Continue </Button>
        </div>
      </FirebaseAuthProvider>

      {/* <div id="firebaseui-auth-container"></div> */}
    </>
  )
}

export default PhoneLogin;
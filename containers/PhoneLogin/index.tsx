import React, { useEffect } from 'react';
import validator from 'validator';
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

  const [country, setCountry] = React.useState({ label: "Canada", id: "CA", dialCode: "+1" });
  const [phone, setPhone] = React.useState("");
  const [verificationId, setVerificationId] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);

  const [codes, setCodes] = React.useState([
    "",
    "",
    "",
    "",
    "",
    ""
  ]);

  // const app: app.app.App | null = app.initializeApp();
  const captchaRef = React.useRef(null);
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

  async function codeVerification() {
    const allCodes = codes.join("");
    try {
      if (!loading) {

        //at this line i am facing issue.
        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, allCodes);
        const authResult = await firebase.auth().signInWithCredential(credential);

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
          throw new Error('logging in with phone number, please try again')
        }
      }

    } catch (error) {
      console.log(error);
      // Show error from here
      toastKey = toaster.negative(<>Error: {error && error.message}</>, {
        autoHideDuration: 6000
      })
    }
    setLoading(false);
  }

  const fullPhoneNumber = `${country.dialCode}${phone}`;
  const isValid = validator.isMobilePhone(fullPhoneNumber);

  return (
    <>
      <Toaster toastKey={toastKey} />

      <FirebaseAuthProvider {...config} firebase={firebase}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', padding: '20px' }}>

          {/* RE-captchaRef */}
          <div id="recaptcha-container" ref={captchaRef}></div>

          {(isEmpty(verificationId)) && (
            <PhoneInput
              country={country}
              onCountryChange={({ option }) => setCountry(option)}
              text={phone}
              onTextChange={e => setPhone(e.currentTarget.value)}
              size={SIZE.default}
              clearable
              positive={isValid}
              error={!isValid}
            />
          )}


          {/* Check if PinCode */}
          <PinCode
            values={codes}
            onChange={({ values }) => {
              setCodes(values)
              const allCodesStatus = values.filter(c => !isEmpty(c))
              if (allCodesStatus.length >= 6 && !loading) {
                setLoading(true);
                codeVerification(); // run verification code
              }
            }}
          // clearOnEscape
          />

          <Button
            size="large"
            shape="pill"
            onClick={() => {
              const appVerifier = new firebase.auth.RecaptchaVerifier(captchaRef.current, {
                size: 'invisible',
                callback: (response: any) => { },
              });

              firebase.auth().signInWithPhoneNumber(fullPhoneNumber, appVerifier)
                .then(function (confirmationResult) {
                  setVerificationId(confirmationResult.verificationId);
                }).catch(function (error) {
                  // TODO error loggin in with phone
                });

            }}
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
    </>
  )
}

export default PhoneLogin;
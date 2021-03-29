import React from 'react';
import validator from 'validator';
import * as config from 'keys/firebase.config.json';
import router from 'next/router';
import { toaster } from 'baseui/toast';
import { Button } from 'baseui/button';
import { isEmpty } from 'lodash';
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
  FirebaseAuthProvider
} from "@react-firebase/auth";
import { H5 } from 'baseui/typography';
import { useAnalyticsAmplitude, AmplitudeAnalytics } from 'hooks/useAnalytics';
import { Amplitude, LogOnMount } from '@amplitude/react-amplitude';
import {
  useAmplitude
} from "react-amplitude-hooks";
import { ANALYTICS } from 'constants/analytics.enum';


const PhoneLoginComponent = (props?: AmplitudeAnalytics) => {
  const { instrument, logEvent, eventProperties, amplitudeInstance } = props;

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
  const fullPhoneNumber = `${country.dialCode}${phone}`;
  const isValid = validator.isMobilePhone(fullPhoneNumber);

  const phoneLoginApiCall = (args: PhoneAuthCreds): Promise<any> => phoneLoginApi({
    args,
    client,
    error: async (error) => {
      const message = error && error.message;
      // Show error
      toastKey = toaster.negative(<>{message}</>, {
        autoHideDuration: 2500
      });

      // return setTimeout(() => {
      //   router.reload();
      // }, 2500);
    },
    success: async (data) => {

      toastKey = toaster.positive(<>Successfully logged in using phone</>, {
        autoHideDuration: 4000
      });

      if (amplitudeInstance) {
        // Save with amplitude right now
        await amplitudeInstance.setUserId(fullPhoneNumber)
      }

      await logEvent(ANALYTICS.USER_LOGIN, { phone: fullPhoneNumber, country })


      // save login data in client browser
      await db.updateAuthItem(data);
      await router.push('/trade');
      // send send user to home
    }
  });

  const codeVerification = async (allCodes: string) => {
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

  // @ts-ignore
  return (
    <>
      <Toaster toastKey={toastKey} />
      <FirebaseAuthProvider {...config as any} firebase={firebase}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', padding: '20px' }}>

          {/* RE-captchaRef */}
          <div id="recaptcha-container" ref={captchaRef}></div>

          {(isEmpty(verificationId)) ? (
            <PhoneInput
              country={country as any}
              onCountryChange={({ option }) => setCountry(option as any)}
              text={phone}
              onTextChange={e => setPhone(e.currentTarget.value)}
              size={SIZE.large}
              clearable
              positive={isValid}
              error={!isValid}
            />
          ) : <PinCode
            size="large"
            values={codes}
            onChange={({ values }) => {
              setCodes(values)
              const allCodesStatus = values.filter(c => !isEmpty(c))
              if (allCodesStatus.length >= 6 && !loading) {
                setLoading(true);
                codeVerification(values.join("")); // run verification code
              }
            }}
          />
          }

          {isEmpty(verificationId) && (
            <Button
              size="large"
              shape="pill"
              // disabled={!isValid}
              onClick={() => {
                if (!isValid) {
                  // show error
                  return;
                }
                const appVerifier = new firebase.auth.RecaptchaVerifier(captchaRef.current, {
                  size: 'invisible',
                  callback: () => { },
                });

                firebase.auth().signInWithPhoneNumber(fullPhoneNumber, appVerifier)
                  .then(function (confirmationResult) {
                    logEvent(ANALYTICS.USER_SEND_CODE, { phone: fullPhoneNumber, code: confirmationResult.verificationId })
                    return setVerificationId(confirmationResult.verificationId);
                  }).catch(function () {
                    // TODO error loggin in with phone
                  });

              }}
              overrides={{
                BaseButton: {
                  style: ({ $theme }) => {
                    return {
                      opacity: isValid ? 1 : 0.7,
                      margin: '20px',
                      width: '60%',
                      ...$theme.typography.font550,
                      backgroundImage: `-webkit-linear-gradient(29deg , rgb(255, 148, 147) 0%, rgb(255, 120, 162) 100%)`
                    };
                  },
                },
              }}
            >
              Send code
            </Button>
          )}

        </div>
      </FirebaseAuthProvider>
    </>
  )
}

export const PhoneLoginContainer = () => {
  return (
    <Amplitude
      eventProperties={(inheritedProps) => ({
        ...inheritedProps,
        scope: 'webapp',
        // eventName,
      })}
    >
      {(amplitudeProps) => <PhoneLoginComponent {...amplitudeProps} />}
    </Amplitude>
  );
}

export default PhoneLoginContainer;
import React from 'react';
import firebaseConfig from 'keys/config';
import * as firebaseui from "firebaseui";
import firebase from "firebase";
interface Props {

};

export const PhoneLogin = (props: Props) => {
  const isServer = typeof window === 'undefined';

  if(firebase.apps.length <= 0){
    firebase.initializeApp(firebaseConfig);
  }
  
  const uiConfig = {
    signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
    // Terms of service url.
    tosUrl: "https://www.google.com",
    // Privacy policy url.
    privacyPolicyUrl: "https://www.google.com",

    // Opens IDP Providers sign-in flow in a popup.
    signInFlow: "popup",
    callbacks: {
      // Called when the user has been successfully signed in.
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        if (authResult.user) {
          // handleSignedInUser(authResult.user);
          console.log('successfully logged in', JSON.stringify(authResult));
        }
        if (authResult.additionalUserInfo) {
          document.getElementById("is-new-user").textContent = authResult
            .additionalUserInfo.isNewUser
            ? "New User"
            : "Existing User";
        }
        // Do not redirect.
        return false;
      }
    },
  };

  React.useEffect(() => {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig)
    return ()=> {ui.delete()}
  });

  return (
    <div id="firebaseui-auth-container"></div>
  )
}

export default PhoneLogin;
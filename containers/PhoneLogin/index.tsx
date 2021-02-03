import React from 'react';
import firebaseConfig from 'keys/config';
import * as firebaseui from "firebaseui";
import firebase from "firebase";
interface Props {

};

export const PhoneLogin = (props: Props) => {

  React.useEffect(() => {
    const fbase = firebase.initializeApp(firebaseConfig);
    const uiConfig = {
      signInSuccessUrl: "https://netflix-clone-ankur.herokuapp.com/", //This URL is used to return to that page when we got success response for phone authentication.
      signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
      tosUrl: "https://netflix-clone-ankur.herokuapp.com/"
    };
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }, []);

  return (
    <div id="firebaseui-auth-container"></div>
  )
}

export default PhoneLogin;
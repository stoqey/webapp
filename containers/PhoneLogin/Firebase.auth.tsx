import * as React from "react";
import { render } from "react-dom";
import firebase from "firebase/app";
import "firebase/auth";
import {
    FirebaseAuthProvider,
    FirebaseAuthConsumer,
    IfFirebaseAuthed,
    IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import config from 'keys/firebase.config.json';

export const FirebaseAuth = () => {
    return (
        // @ts-ignore
        <FirebaseAuthProvider {...config} firebase={firebase}>
            <div>

                <button
                    onClick={() => {
                        const googleAuthProvider = new firebase.auth.PhoneAuthProvider();
                        firebase.auth().signInWithPopup(googleAuthProvider);
                    }}
                >
                    Sign In with Google
                </button>

                <FirebaseAuthConsumer>
                    {({ isSignedIn, user, providerId }) => {
                        return (
                            <pre style={{ height: 300, overflow: "auto" }}>
                                {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
                            </pre>
                        );
                    }}
                </FirebaseAuthConsumer>

                <div>
                    <IfFirebaseAuthed>
                        {() => {
                            return <div>You are authenticated</div>;
                        }}
                    </IfFirebaseAuthed>
                    <IfFirebaseAuthedAnd
                        filter={({ providerId }) => providerId !== "anonymous"}
                    >
                        {({ providerId }) => {
                            return <div>You are authenticated with {providerId}</div>;
                        }}
                    </IfFirebaseAuthedAnd>
                </div>

            </div>
        </FirebaseAuthProvider>
    );
};

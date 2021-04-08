import React from 'react';
import querystring from 'querystring';
import dynamic from 'next/dynamic';
import { getBackendHost } from 'utils/api.utils';
import { useUserInfo } from 'hooks/useUserInfo';

const SuccessStripe = dynamic(() => import("./Success"), { ssr: false })

export const StripeConnectForm = ({ children }: any) => {

    const { user } = useUserInfo();
    const userId = user && user.id;

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        const params = {
            userId,
            host: window.location.origin,
        }

        const query = querystring.stringify(params)

        // Call your backend to create the Checkout Session
        const response = await fetch(`${getBackendHost()}/rest/stripe/onboard-user?${query}`, {
            method: 'POST',
            // @ts-ignore
            body: params
        });

        const responseJson = await response.json();
        console.log('session session session', responseJson);

        const url = responseJson.url;

        if (!url) {
            return console.log('[error]', response);
        }

        return window.open(url, "_blank"); // redirect to stripe
    };

    // const childrenWithProps = React.Children.map(children, child => {
    //     // checking isValidElement is the safe way and avoids a typescript error too
    //     React.cloneElement(child, { onClick: handleSubmit });
    // });

    const Component = () => React.cloneElement(children, { onClick: handleSubmit });

    return (
        <>
            {/* <SuccessStripe /> */}
            <Component />
        </>

    );
};
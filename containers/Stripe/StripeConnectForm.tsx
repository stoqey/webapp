import querystring from 'querystring';
import dynamic from 'next/dynamic';
import { getBackendHost } from 'utils/api.utils';

const SuccessStripe = dynamic(() => import("./Success"), { ssr: false })

export const StripeConnectForm = ({ children, userId }: any) => {

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

    return (
        <>
            {/* <SuccessStripe /> */}
            <div onClick={handleSubmit}>
                {children}
            </div>
        </>

    );
};
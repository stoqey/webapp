import querystring from 'querystring';
import dynamic from 'next/dynamic';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getBackendHost } from 'utils/api.utils';

const SuccessStripe = dynamic(() => import("./Success"), { ssr: false })

export const StripeCheckoutForm = ({ children, userId, amount }: any) => {
    const stripe = useStripe();
    const elements = useElements();

    console.log('StripeCheckoutForm');

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const params = {
            userId,
            amount,
            host: window.location.origin,
        }

        const query = querystring.stringify(params)

        // Call your backend to create the Checkout Session
        const response = await fetch(`${getBackendHost()}/stripe/create-checkout-session?${query}`, {
            method: 'POST',
            // @ts-ignore
            body: params
        });

        const session = await response.json();

        console.log('session session session', session);

        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.log('[error]', result.error);
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
        }
    };

    return (
        <>
            <SuccessStripe />
            <div onClick={handleSubmit}>
                {children}
            </div>
        </>

    );
};
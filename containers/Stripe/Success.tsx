import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { startsWith } from 'lodash';

const StripeSuccess = () => {
    const [success, setSuccess] = useState(false);
    
    const sessionId = window.location.search.replace('?success=true&stripe_session_id=', '');
    console.log('sessionId is ', sessionId);
    // useEffect(() => {
    //     async function fetchSession() {
    //         // Router.push('/product', '/product/some-product?sortBy=price', { shallow: true })
    //         setSession(
    //             await fetch('/checkout-session?sessionId=' + sessionId).then((res) =>
    //                 res.json()
    //             )
    //         );
    //     }
    //     fetchSession();
    // }, [sessionId]);

    useEffect(() => {
        setSuccess(true);
    }, [sessionId])

    return (
        <div className="sr-root">
            <div className="sr-main">
                {success && (
                    <div className="sr-payment-summary completed-view">
                        <h1>Your payment succeeded</h1>
                        <h4>View CheckoutSession response:</h4>
                    </div>
                )}

                <div className="sr-section completed-view">
                    <div className="sr-callout">

                    </div>

                </div>
            </div>
        </div>
    );
};

export default StripeSuccess;
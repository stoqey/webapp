import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const StripeSuccess = () => {
    const [session, setSession] = useState({});
    const {pathname} = useRouter();
    // const sessionId = location.search.replace('?stripe_session_id=', '');

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

    return (
        <div className="sr-root">
            <div className="sr-main">
                <header className="sr-header">
                    <div className="sr-header__logo"></div>
                </header>
                <div className="sr-payment-summary completed-view">
                    <h1>Your payment succeeded</h1>
                    <h4>View CheckoutSession response:</h4>
                </div>
                <div className="sr-section completed-view">
                    <div className="sr-callout">
                        
                    </div>
                    
                </div>
            </div>
            <div className="sr-content">
                <div className="pasha-image-stack">
                    <img
                        alt=""
                        src="https://picsum.photos/280/320?random=1"
                        width="140"
                        height="160"
                    />
                    <img
                        alt=""
                        src="https://picsum.photos/280/320?random=2"
                        width="140"
                        height="160"
                    />
                    <img
                        alt=""
                        src="https://picsum.photos/280/320?random=3"
                        width="140"
                        height="160"
                    />
                    <img
                        alt=""
                        src="https://picsum.photos/280/320?random=4"
                        width="140"
                        height="160"
                    />
                </div>
            </div>
        </div>
    );
};

export default StripeSuccess;
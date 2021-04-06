import React, { useState, useEffect } from 'react';
import { Router, useRouter } from 'next/router';
import { isEmpty, startsWith } from 'lodash';
import ResultsDialog from '@/components/Modal/Result.dialog';

const StripeSuccess = () => {
    const router = useRouter();
    const sessionId = window.location.search.replace('?success=true&stripe_session_id=', '');
    const isSessionError = startsWith(window.location.search, '?failed=true&stripe_session_id=');
    // console.log('sessionId is ', sessionId);
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
        <ResultsDialog
            show={isSessionError || !isEmpty(sessionId)}
            hide={() => router.push("/funds")}
            success={!isSessionError}
            title={isSessionError ? "Error processing your payment" : "Successfully processed your payment"}
            content={isSessionError ? [{ title: "Please try again", value: "later" }] : [{ title: "Thank you", value: "for using Stoqey" }]}
        />
    );
};

export default StripeSuccess;
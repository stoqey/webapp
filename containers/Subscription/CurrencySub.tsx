import React from 'react';
import { CURRENCY_SUBSCRIPTION } from "@stoqey/client-graphql";
import { useApolloClient } from "@apollo/client";
import { AppEvents, APPEVENTS } from '@/lib/AppEvent';

interface Props {
    symbol: string;
};

/**
 * Currency subscription
 * @param props 
 */
export const CurrencySub = (props: Props) => {
    const { symbol = "STQ" } = props;
    const client = useApolloClient();

    React.useEffect(() => {

        const events = AppEvents.Instance;
        const subscription = client.subscribe({
            query: CURRENCY_SUBSCRIPTION,
            variables: { symbol }
        })

        const results = subscription.subscribe(data => {

            console.log('on subscribe', data);
            // Post data from here
            events.emit(APPEVENTS.CURRENCY, data);
        });

        return () => { results.unsubscribe() }

    }, []);

    return <div id="currency-subscription"></div>
}
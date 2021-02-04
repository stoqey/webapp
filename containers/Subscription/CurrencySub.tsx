import React from 'react';
import { CURRENCY_SUBSCRIPTION } from "@stoqey/client-graphql"
import { useSubscription, useApolloClient } from "@apollo/client"

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
        const subscription = client.subscribe({
            query: CURRENCY_SUBSCRIPTION,
            variables: { symbol }
        })

        const results = subscription.subscribe(da => {
            // Post data from here
        });

        return () => { results.unsubscribe() }

    }, []);

    return <div id="currency-subscription"></div>
}
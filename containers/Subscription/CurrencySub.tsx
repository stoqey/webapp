import React from 'react';
import gql from 'graphql-tag';
import _ from 'lodash';
import { MarketDataTypeFragment } from "@stoqey/client-graphql";
import { useApolloClient, useSubscription } from "@apollo/client";
import { AppEvents, APPEVENTS } from '@/lib/AppEvent';


export const CURRENCY_SUBSCRIPTION = gql`
    subscription GetCurrency($symbol: String!) {
        data: onCurrency(symbol: $symbol) {
            ...MarketDataTypeFragment
        }
    }
    ${MarketDataTypeFragment}
`;


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
            variables: { symbol },
            fetchPolicy: 'network-only'
        })

        const results = subscription.subscribe(data => {

            const dataToSend = _.get(data, 'data.data', {});
            console.log('on subscribe', dataToSend);
            // Post data from here
            events.emit(APPEVENTS.CURRENCY, dataToSend);
        });

        return () => { results.unsubscribe() }

    }, []);

    return <div id="currency-subscription"></div>
}

export default CurrencySub;
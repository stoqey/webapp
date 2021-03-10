import React from 'react';
import gql from 'graphql-tag';
import _ from 'lodash';
import { ALL_ORDERS_SUBSCRIPTION, CURRENCY_SUBSCRIPTION} from "@stoqey/client-graphql";
import { useApolloClient, useSubscription } from "@apollo/client";
import { AppEvents, APPEVENTS } from '@/lib/AppEvent';

interface Props {
    symbol: string;
};

/**
 * Orders subscription
 * @param props 
 */
export const OrdersSub = () => {
    const client = useApolloClient();
    React.useEffect(() => {

        const events = AppEvents.Instance;

        const subscription = client.subscribe({
            query: ALL_ORDERS_SUBSCRIPTION,
            variables: {},
            fetchPolicy: 'network-only'
        })

        const results = subscription.subscribe(data => {
            const dataToSend = _.get(data, 'data.data', {});
            events.setCurrency(dataToSend);
            events.emit(APPEVENTS.CURRENCY, dataToSend);
        });

        return () => { results.unsubscribe() }

    }, []);

    return <div id="orders-subscription"></div>
}

export default OrdersSub;
import React from 'react';
import _get from 'lodash/get';
import OrderBook from '@/components/OrderBook';
import { GET_ALL_ORDERS, ALL_ORDERS_SUBSCRIPTION, OrderType } from '@stoqey/client-graphql';
import { useApolloClient } from '@apollo/client';


export const OrderBookContainer = () => {

    const [orders, setOrders ] = React.useState<OrderType[]>([]);

    // Use quote query
    // Use get orders query
    // Listen for all order changes

    const client = useApolloClient();
    React.useEffect(() => {

        const subscription = client.subscribe({
            query: ALL_ORDERS_SUBSCRIPTION,
            variables: {},
            fetchPolicy: 'network-only'
        })
        const results = subscription.subscribe(data => {
            const dataToSend = _get(data, 'data.data', []);
            const parsedData = dataToSend.map(i => ({
                ...i,
                date: new Date(i.date)
            }));

            setOrders(parsedData);
        });

        return () => { results.unsubscribe() }

    }, []);

    return <OrderBook orders={orders} />;
}
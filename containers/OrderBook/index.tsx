import React from 'react';
import _get from 'lodash/get';
import OrderBook from '@/components/OrderBook';
import gql from 'graphql-tag';
import { GET_ALL_ORDERS, OrderType } from '@stoqey/client-graphql';
import { useApolloClient, useQuery } from '@apollo/client';
import { isEmpty } from 'lodash';

const ALL_ORDERS_SUBSCRIPTION = gql`
    subscription SubAllOrders {
        data: onOrders {
            id
            qty
            price
        }
    }
`;

export const OrderBookContainer = () => {

    const client = useApolloClient();
    const { data: initData } = useQuery(GET_ALL_ORDERS, {
        fetchPolicy: 'network-only'
    });
    const defualOrders = _get(initData, 'data', []);
    const [orders, setOrders] = React.useState<OrderType[]>(defualOrders);
    console.log('initial data is ', defualOrders);

     // Use quote query
    // Use get orders query
    // Listen for all order changes
    React.useEffect(() => {

        const subscription = client.subscribe({
            query: ALL_ORDERS_SUBSCRIPTION,
            variables: {},
            fetchPolicy: 'network-only'
        })
        const results = subscription.subscribe(data => {
            const dataToSend = _get(data, 'data.data', []);
            console.log('subscription.subscribe ', dataToSend);
            const parsedData = dataToSend.map(i => ({
                ...i,
                date: new Date(i.date)
            }));

            setOrders(parsedData);
        });

        return () => { results.unsubscribe() }

    }, []);

    return <OrderBook orders={isEmpty(orders)? defualOrders: orders} />;
}

export default OrderBookContainer;
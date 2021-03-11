import React from 'react';
import _get from 'lodash/get';
import OrderBook from '@/components/OrderBook';
import gql from 'graphql-tag';
import { GET_ALL_ORDERS,ALL_ORDERS_SUBSCRIPTION, OrderType } from '@stoqey/client-graphql';
import { useApolloClient, useQuery } from '@apollo/client';
import { isEmpty } from 'lodash';
import { useAppEvent } from 'hooks/useAppEvent';
import { APPEVENTS } from '@/lib/AppEvent';


export const OrderBookContainer = () => {
    const orders: OrderType[] = useAppEvent(APPEVENTS.ORDERS);
    return <OrderBook orders={orders} />;
}

export default OrderBookContainer;
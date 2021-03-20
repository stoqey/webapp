import React from 'react';
import _get from 'lodash/get';
import OrderBook from '@/components/OrderBook';
import {OrderType } from '@stoqey/client-graphql';
import { useAppEvent } from 'hooks/useAppEvent';
import { APPEVENTS } from '@/lib/AppEvent';


export const OrderBookContainer = () => {
    const orders: OrderType[] = useAppEvent(APPEVENTS.ORDERS);
    return <OrderBook orders={orders} />;
}

export default OrderBookContainer;
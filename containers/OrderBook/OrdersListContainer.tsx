import React, { useState } from 'react';
import { NextPage } from 'next';
import { Button } from 'baseui/button';
import { MarketDataType, PortfolioType, OrderType } from '@stoqey/client-graphql'
import { useAppEvent } from 'hooks/useAppEvent';
import { APPEVENTS } from '@/lib/AppEvent';
import OrdersTable from '@/components/OrderBook/OrdersTable';


const OrdersListContainer: NextPage<{}> = () => {
	const orders: OrderType[] = useAppEvent(APPEVENTS.ORDERS);
	return (
		<>
			<OrdersTable orders={orders} />
		</>
	);
};

export default OrdersListContainer;

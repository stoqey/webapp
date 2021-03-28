import React, { useState } from 'react';
import { NextPage } from 'next';
import { Button } from 'baseui/button';
import { MarketDataType, PortfolioType, OrderType } from '@stoqey/client-graphql'
import { useAppEvent } from 'hooks/useAppEvent';
import { APPEVENTS } from '@/lib/AppEvent';
import OrdersTable from '@/components/OrderBook/OrdersTable';
import { useUserInfo } from 'hooks/useUserInfo';
import { isEmpty } from 'lodash';


const OrdersListContainer: NextPage<{}> = () => {
	const orders: OrderType[] = useAppEvent(APPEVENTS.ORDERS);

	const { user } = useUserInfo();
    const userId = user && user.id;

	return (
		<>
			<OrdersTable orders={orders} userId={userId} />
		</>
	);
};

export default OrdersListContainer;

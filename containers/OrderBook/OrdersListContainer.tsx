import React, { useState } from 'react';
import { NextPage } from 'next';
import { Button } from 'baseui/button';
import { MarketDataType, PortfolioType, OrderType } from '@stoqey/client-graphql';
import Toaster from '@/components/UiElements/Toaster/Toaster';
import { useAppEvent } from 'hooks/useAppEvent';
import { APPEVENTS } from '@/lib/AppEvent';
import OrdersTable from '@/components/OrderBook/OrdersTable';
import { useUserInfo } from 'hooks/useUserInfo';
import { isEmpty } from 'lodash';
import CancelOrder from './CancelOrder.modal';
import { toaster } from 'baseui/toast';

interface State {
	show: boolean;
	selectedOrder: OrderType;
}

interface Props {
	filterMine?: boolean;
}


const OrdersListContainer = (props: Props) => {
	const allOrders: OrderType[] = useAppEvent(APPEVENTS.ORDERS) || [];
	const { filterMine } = props;
	const [state, setState] = useState<State>({ show: false, selectedOrder: null });
	const { user } = useUserInfo();
	const { show, selectedOrder } = state;
	const userId = user && user.id;

	const orders = filterMine && !isEmpty(allOrders) ? allOrders.filter(i => i.clientId === userId) : allOrders;


	return (
		<>
			<CancelOrder show={show} order={selectedOrder} hide={() => setState({ ...state, show: false })} />
			<OrdersTable orders={orders} userId={userId} onCancelOrder={async (order) => {
				setState({
					show: true,
					selectedOrder: order,
				});
			}} />
		</>
	);
};

export default OrdersListContainer;

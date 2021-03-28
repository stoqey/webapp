import React, { useState } from 'react';
import { NextPage } from 'next';
import { Button } from 'baseui/button';
import { MarketDataType, PortfolioType, OrderType } from '@stoqey/client-graphql'
import { useAppEvent } from 'hooks/useAppEvent';
import { APPEVENTS } from '@/lib/AppEvent';
import OrdersTable from '@/components/OrderBook/OrdersTable';
import { useUserInfo } from 'hooks/useUserInfo';
import { isEmpty } from 'lodash';
import CancelOrder from './CancelOrder.modal';

interface State {
	show: boolean;
	selectedId: string;
}

const OrdersListContainer: NextPage<{}> = () => {
	const orders: OrderType[] = useAppEvent(APPEVENTS.ORDERS);

	const [state, setState] = useState<State>({ show: false, selectedId: null });
	const { user } = useUserInfo();
	const { show, selectedId } = state;
	const userId = user && user.id;

	return (
		<>
			<CancelOrder show={show} orderId={selectedId} hide={() => setState({ ...state, show: false })} />
			<OrdersTable orders={orders} userId={userId} onCancelOrder={async (orderId) => {
				setState({
					show: true,
					selectedId: orderId,
				});
			}} />
		</>
	);
};

export default OrdersListContainer;

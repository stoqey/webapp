import React from 'react';
import { NextPage } from 'next';
import { OrderType } from '@stoqey/client-graphql';
import { CurrencyNumberContainer } from 'containers/Currency/CurrencyNumber';
import { styled } from 'baseui';
import { H6 } from 'baseui/typography';
import { isEmpty } from 'lodash';
import { sortBuyOrders, sortSellOrders } from 'utils/orders.utils'

export const Block = styled('div', ({ $theme }) => ({
	backgroundColor: $theme.colors.primaryB,
	borderBottom: `1px solid ${$theme.colors.backgroundTertiary}`,
}));

interface Props {
	orders: OrderType[];
	showCurrency?: boolean;
};

const OrderBook: NextPage<Props> = (props: Props) => {
	const { orders = [], showCurrency = true } = props;

	let bids = [];
	let asks = [];

	if (!isEmpty(orders)) {
		bids = orders.filter((i) => i.action === 'BUY').sort(sortBuyOrders);
		asks = orders.filter((i) => i.action === 'SELL').sort(sortSellOrders);
	}

	return (
		<>
			{/* Currency amount */}
			{showCurrency && (
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<CurrencyNumberContainer />
				</div>
			)}

			<div style={{ display: 'flex' }}>

				{/* BID side */}
				<div style={{ flex: 0.5 }}>

					{/* title */}
					<Block style={{ display: 'flex', justifyContent: 'space-between', padding: '6px' }}>
						<H6></H6>
						<H6>Bid</H6>
					</Block>

					{/* Bid Cell */}
					{bids.map(i => {
						const { price, qty: totalQty, filledQty, clientId = "" } = i;
						const qty = totalQty - filledQty;

						const userId = clientId.slice(0, 6)
						return (
							<div key={i.id + qty}>
								<div
									style={{
										padding: '10px',
										background: 'rgba(49, 242, 161, 0.39)',
										display: 'flex', justifyContent: 'space-between', width: '100%'
									}}>
									<H6>{qty}</H6>
									<H6>${price}</H6>
								</div>
								<p>{userId}</p>
							</div>

						)
					})}


				</div>

				{/* Ask side */}
				<div style={{ flex: 0.5 }}>
					{/* title */}
					<Block style={{ display: 'flex', justifyContent: 'space-between', padding: '6px' }}>
						<H6>Ask</H6>
						<H6></H6>
					</Block>

					{/* Ask Cell */}
					{asks.map(i => {
						const { price, qty: totalQty, filledQty, clientId } = i;
						const qty = totalQty - filledQty;
						const userId = clientId.slice(0, 6)
						return (
							<div key={i.id + qty}>
								<div style={{ padding: '10px', background: 'rgb(216 33 33 / 38%)', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
									<H6>${price}</H6>
									<H6>{qty}</H6>
								</div>
								<p>{userId}</p>
							</div>

						)
					})}

				</div>
				<div></div>
			</div>
		</>
	);
};

export default OrderBook;

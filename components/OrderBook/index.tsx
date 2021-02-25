import React from 'react';
import { NextPage } from 'next';
import { OrderType } from '@stoqey/client-graphql';
import { CurrencyNumberContainer } from 'containers/Currency/CurrencyNumber';
import { styled } from 'baseui';
import { H6 } from 'baseui/typography';

export const Block = styled('div', ({ $theme }) => ({
	backgroundColor: $theme.colors.primaryB,
	borderBottom: `1px solid ${$theme.colors.backgroundTertiary}`,
}));

interface Props {
	close: number;
	orders: OrderType[];
};

const OrderBook: NextPage<{}> = () => {
	return (
		<>
			{/* Currency amount */}
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<CurrencyNumberContainer />
			</div>
			<div style={{ display: 'flex' }}>

				{/* BID side */}
				<div style={{ flex: 0.5, height: '100px' }}>

					{/* title */}
					<Block style={{ display: 'flex', justifyContent: 'space-between', padding: '6px' }}>
						<H6></H6>
						<H6>Bid</H6>
					</Block>

					{/* Bid Cell */}
					<div style={{ padding: '10px', background: 'rgba(49, 242, 161, 0.39)', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
						<H6>2,333</H6>
						<H6>3.5</H6>
					</div>

				</div>

				{/* Ask side */}
				<div style={{ flex: 0.5, height: '100px' }}>
					{/* title */}
					<Block style={{ display: 'flex', justifyContent: 'space-between', padding: '6px' }}>
						<H6>Ask</H6>
						<H6></H6>
					</Block>

					{/* Ask Cell */}
					<div style={{ padding: '10px', background: 'rgb(216 33 33 / 38%)', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
						<H6>3.5</H6>
						<H6>2,333</H6>
					</div>
				</div>
				<div></div>
			</div>
		</>
	);
};

export default OrderBook;

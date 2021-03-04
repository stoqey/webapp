import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Block } from 'baseui/block';
import { Grid, Cell } from 'baseui/layout-grid';
import PageTitle from '@/components/UiElements/PageTitle/PageTitle';
import Container from '@/components/UiElements/Container/Container';
import HighlightChart from 'containers/Chart/HighlightChart';
import CurrencyPill from '@/components/Currency';
import OrderBookContainer from 'containers/OrderBook';
import AreaV1 from 'containers/Chart/AreaV1';

const PhoneLogin = dynamic(() => import('containers/PhoneLogin'), {
	ssr: false,
});

const Pricing: NextPage<{}> = () => {
	const [loading, setLoading] = useState(false);
	const [pricingPlan, setPricingPlan] = useState('Free');

	const handlePricingPlan = (type: string) => {
		setLoading(true);
		setPricingPlan(type);

		setTimeout(() => {
			setLoading(false);
		}, 600);
	};

	return (
		<>
			<Head>
				<title>Home | Stoqey</title>
				<meta name="Description" content="Stoqey Beta" />
			</Head>

			<PageTitle backdrop={false} title={'Beta'} />

			<Container>
				<Block paddingTop={['0', '0', '0', '40px']}>
					<Grid gridColumns={12} gridGutters={0} gridMargins={0}>
						<Cell span={[12, 12, 6]}>
							<OrderBookContainer />
						</Cell>
						<Cell span={[12, 12, 6]}>
							<AreaV1 />
						</Cell>
					</Grid>
				</Block>
			</Container>
		</>
	);
};

export default Pricing;

import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Grid, Cell } from 'baseui/layout-grid';
import { Block } from 'baseui/block';
import Container from 'components/UiElements/Container/Container';
import PortfolioMenu from 'components/SideMenu/PortfolioMenu';
import TransactionsTable from 'containers/Transactions'
import OrderBook from '@/components/OrderBook';
import OrderBookContainer from 'containers/OrderBook';


const TransactionsHistory: NextPage<{}> = () => {
	return (
		<>
			<Head>
				<title>Transactions history | Stoqey.</title>
				<meta name="Description" content="Stoqey transactions history page" />
			</Head>

			<Container>
				<Block paddingTop={['0', '0', '0', '40px']}>
					<Grid gridColumns={12} gridGutters={0} gridMargins={0}>
						<Cell span={[12, 12, 3]}>
							<PortfolioMenu />
						</Cell>
						<Cell span={[12, 12, 9]}>
							<OrderBookContainer />
						</Cell>
					</Grid>
				</Block>
			</Container>
		</>
	);
};

export default TransactionsHistory;

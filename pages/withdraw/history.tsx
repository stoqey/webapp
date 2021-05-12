import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Grid, Cell } from 'baseui/layout-grid';
import { Block } from 'baseui/block';
import Container from 'components/UiElements/Container/Container';
import WithdrawRequestMenu from '@/components/SideMenu/WithdrawRequestMenu';
import TransactionsTable from 'containers/Transactions'
import FundsMenu from '@/components/SideMenu/FundsMenu';
import WithdrawRequestsTable from 'containers/Withdraw/WithdrawRequests.lists';


const TransactionsHistory: NextPage<{}> = () => {
	return (
		<>
			<Head>
				<title>Withdraw history | Stoqey</title>
				<meta name="Description" content="Withdraw history | Stoqey" />
			</Head>

			<Container>
				<Block paddingTop={['0', '0', '0', '40px']}>
					<Grid gridColumns={12} gridGutters={0} gridMargins={0}>
						<Cell span={[12, 12, 3]}>
							<WithdrawRequestMenu />
						</Cell>
						<Cell span={[12, 12, 9]}>
							<WithdrawRequestsTable />
						</Cell>
					</Grid>
				</Block>
			</Container>
		</>
	);
};

export default TransactionsHistory;

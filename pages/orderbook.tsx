import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Grid, Cell } from 'baseui/layout-grid';
import { Block } from 'baseui/block';
import Container from 'components/UiElements/Container/Container';
import PortfolioMenu from 'components/SideMenu/PortfolioMenu';
import TransactionsTable from 'containers/Transactions'


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

							{/* Currency amount */}
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<div style={{ textAlign: 'center', padding: '4px' }}>

									{/*  */}
									<div style={{ display: 'flex' }}>
										<h1>$123.5</h1>
										<p style={{ fontSize: '15px' }}>USD</p>
									</div>

									<p style={{ color: 'red' }}>-0.51 (0.40%)</p>
								</div>

							</div>
							<div style={{ display: 'flex' }}>

								{/* BID side */}
								<div style={{ flex: 0.5, background: 'grey', height: '100px' }}>

									{/* title */}
									<div style={{ display: 'flex', justifyContent: 'space-between', background: 'white', padding: '6px' }}>
										<h4></h4>
										<h4>Bid</h4>
									</div>

									{/* Bid Cell */}
									<div style={{ padding: '10px', background: '#5bc79a', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
										<h4>2,333</h4>
										<h4>3.5</h4>
									</div>

								</div>

								{/* Ask side */}
								<div style={{ flex: 0.5, background: 'white', height: '100px' }}>
									{/* title */}
									<div style={{ display: 'flex', justifyContent: 'space-between', background: 'white', padding: '6px' }}>
										<h4>Ask</h4>
										<h4></h4>
									</div>

									{/* Ask Cell */}
									<div style={{ padding: '10px', background: '#ea4c3b', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
										<h4>2,333</h4>
										<h4>3.5</h4>
									</div>


								</div>
								<div></div>
							</div>
						</Cell>
					</Grid>
				</Block>
			</Container>
		</>
	);
};

export default TransactionsHistory;

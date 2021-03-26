import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Grid, Cell } from 'baseui/layout-grid';
import { Block } from 'baseui/block';
import Container from 'components/UiElements/Container/Container';
import PortfolioMenu from 'components/SideMenu/PortfolioMenu';
import Portfolios from 'containers/Trade'
import {
	Title,
	Subtitle,
} from 'components/PageStyles/Settings.styled';
const stoqeyLogo = require('assets/images/STQ.png');

const title = 'Portfolios';
const subtitle = 'Shares trading on Stoqey';

const Trade: NextPage<{}> = () => {

	return (
		<>
			<Head>
				<title>Trade | Stoqey</title>
				<meta name="Description" content="Trade | Stoqey" />
			</Head>

			<Container>
				<Block paddingTop={['0', '0', '0', '40px']}>
					<Grid gridColumns={12} gridGutters={0} gridMargins={0}>
						<Cell span={[12, 12, 3]}>
							<PortfolioMenu />
						</Cell>

						<Cell span={[12, 12, 9]}>
							<Block paddingTop={['10px', '15px', '30px', '0']}>
								<Title>{title}</Title>
								<Subtitle>{subtitle}</Subtitle>
								<Portfolios />
							</Block>
						</Cell>
					</Grid>
				</Block>
			</Container>
		</>
	);
};

export default Trade;

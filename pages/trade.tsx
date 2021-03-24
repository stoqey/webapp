import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Grid, Cell } from 'baseui/layout-grid';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import { Select } from 'baseui/select';
import Container from 'components/UiElements/Container/Container';
import PortfolioMenu from 'components/SideMenu/PortfolioMenu';
import ListGridCard from 'components/UiElements/ListGridCard/ListGridCard';
import Portfolios from 'containers/Trade'
import {
	Title,
	Subtitle,
	SpaceBetween,
} from 'components/PageStyles/Settings.styled';

import applicationsPageData from 'data/applicationsPage';
import CurrencyPill from '@/components/Currency';
import { useQuery } from '@apollo/client';
import { GET_ME } from "@stoqey/client-graphql";
import { useUserInfo } from 'hooks/useUserInfo';
import Toaster from '@/components/UiElements/Toaster/Toaster';
import OrdersListContainer from 'containers/OrderBook/OrdersListContainer';
import { H5, H6, Paragraph3 } from 'baseui/typography';

const stoqeyLogo = require('assets/images/STQ.png');

const sortOptions = [
	{ label: 'Sort by A', value: 'a' },
	{ label: 'Sort by B', value: 'b' },
	{ label: 'Sort by C', value: 'c' },
];

const title = 'Positions';
const subtitle = 'Number of shares bought from stoqey';


const positions = [
	{
		id: 1,
		thumb: stoqeyLogo,
		title: 'Stoqey',
		description: 'Number of shares',
	},
];

const Trade: NextPage<{}> = () => {
	let to
	const { applications } = applicationsPageData;
	const [value, setValue] = useState([]);

	const { user } = useUserInfo();

	const handleSort = (e: any) => {
		setValue(e.value);
	};

	const handleRemoveAll = () => {
		console.log('Remove all');
	};

	const handleRemoveApplication = (id: string) => {
		console.log('Remove', id);
	};

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

							<CurrencyPill amount={user && user.balance} name={'wallet'} />


							<Block paddingTop={['10px', '15px', '30px', '0']}>
								<Title>{title}</Title>
								<Subtitle>{subtitle}</Subtitle>

								
								<Portfolios />

								<OrdersListContainer />
							</Block>
						</Cell>
					</Grid>
				</Block>
			</Container>
		</>
	);
};

export default Trade;

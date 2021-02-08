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
import Portfolios from 'containers/Portfolio'
import {
	Title,
	Subtitle,
	SpaceBetween,
} from '../../components/PageStyles/Settings.styled';

import applicationsPageData from '../../data/applicationsPage';

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

const Positions: NextPage<{}> = () => {
	const { applications } = applicationsPageData;
	const [value, setValue] = useState([]);

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
				<title>{title} | Stoqey.</title>
				<meta name="Description" content="Stoqey positions" />
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

								<SpaceBetween>
									<Select
										options={sortOptions}
										value={value}
										placeholder="Sort"
										onChange={handleSort}
										overrides={{
											Root: {
												style: () => {
													return { width: '100px' };
												},
											},
											ControlContainer: {
												style: () => {
													return {
														borderWidth: 0,
														borderTopLeftRadius: '30px',
														borderTopRightRadius: '30px',
														borderBottomRightRadius: '30px',
														borderBottomLeftRadius: '30px',
														backgroundColor: 'transparent',
													};
												},
											},
											ValueContainer: {
												style: () => {
													return { paddingLeft: 0 };
												},
											},
										}}
									/>
									{/* Remove all */}
									{/* <Button
										onClick={handleRemoveAll}
										kind="secondary"
										shape="pill"
										overrides={{
											BaseButton: {
												style: ({ $theme }) => {
													return {
														...$theme.typography.font250,
														minWidth: '101px',
													};
												},
											},
										}}
									>
										Remove all
									</Button> */}
								</SpaceBetween>

								<Portfolios />
							</Block>
						</Cell>
					</Grid>
				</Block>
			</Container>
		</>
	);
};

export default Positions;

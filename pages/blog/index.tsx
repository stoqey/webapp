import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Grid, Cell } from 'baseui/layout-grid';
import { useQuery, gql } from '@apollo/client';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import Container from 'components/UiElements/Container/Container';
import PageTitle from 'components/UiElements/PageTitle/PageTitle';
import ProductCard from 'components/UiElements/ProductCard/ProductCard';

const TITLE = 'Shopping Store';
const SUB_TITLE = 'Awesome GitHub T-shirts and other cool swag';

const Shop: NextPage<{}> = () => {

	return (
		<>
			<Head>
				<title>Shop | INST.</title>
				<meta name="Description" content="Inst shop page" />
			</Head>

			<PageTitle title={TITLE} subtitle={SUB_TITLE} />

			<Container>
				<Block paddingBottom="20px">
					<img
						src={require('../../assets/images/shop-banner.png')}
						width="100%"
						alt="Banner"
					/>
				</Block>
			</Container>
		</>
	);
};

export default Shop;

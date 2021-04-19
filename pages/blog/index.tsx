import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import PageTitle from 'components/UiElements/PageTitle/PageTitle';
import ProductCard from 'components/UiElements/ProductCard/ProductCard';

const TITLE = 'Stoqey Blog';
const SUB_TITLE = 'Stoqey Blog';

const Shop: NextPage<{}> = () => {

	return (
		<>
			<Head>
				<title>Stoqey Blogs.</title>
				<meta name="Description" content="Stoqey Blog" />
			</Head>

			<PageTitle title={TITLE} subtitle={SUB_TITLE} />
		</>
	);
};

export default Shop;

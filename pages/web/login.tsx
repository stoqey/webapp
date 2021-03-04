import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Block } from 'baseui/block';
import firebase from "firebase";
import firebaseConfig from 'keys/firebase.config.json';
import { Grid, Cell } from 'baseui/layout-grid';
import PageTitle from '@/components/UiElements/PageTitle/PageTitle';
import Container from '@/components/UiElements/Container/Container';
import AreaV1 from 'containers/Chart/AreaV1';

const PhoneLogin = dynamic(() => import('containers/PhoneLogin'), {
	ssr: false,
});

const LoginPage: NextPage<{}> = () => {

	if (firebase.apps.length <= 0) {
		firebase.initializeApp(firebaseConfig);
	}

	return (
		<>
			<Head>
				<title>Login/Signup | Stoqey</title>
				<meta name="Description" content="Login/Signup | Stoqey" />
			</Head>

			<PageTitle backdrop={true} title={'Sup 👋, enter your phone'} subtitle={'to continue to Stoqey, new or existing investors'} />

			<Container>
				<Block paddingTop={['0', '0', '0', '40px']}>
					<Grid gridColumns={12} gridGutters={0} gridMargins={0}>
						<Cell span={[12, 12, 6]}>
							<PhoneLogin />
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

export default LoginPage;

import React, { Fragment } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Grid, Cell } from 'baseui/layout-grid';
import { Block } from 'baseui/block';
import { StyledTable, StyledBodyCell } from 'baseui/table-grid';
import { MdCloudDownload } from 'react-icons/md';
import Container from 'components/UiElements/Container/Container';
import PortfolioMenu from 'components/SideMenu/PortfolioMenu';
import SvgIcon from 'components/UiElements/SvgIcon/SvgIcon';
import TransactionsTable from 'containers/Transactions'
import { TextButton } from 'components/PageStyles/Settings.styled';
import { StyledTableHeadAlt } from 'components/PageStyles/Apps.styled';

import billingPageData from '../../data/billingPage';

const Billing: NextPage<{}> = () => {
	return (
		<>
			<Head>
				<title>Billing | INST.</title>
				<meta name="Description" content="Inst billing setting page" />
			</Head>

			<Container>
				<Block paddingTop={['0', '0', '0', '40px']}>
					<Grid gridColumns={12} gridGutters={0} gridMargins={0}>
						<Cell span={[12, 12, 3]}>
							<PortfolioMenu />
						</Cell>
						<Cell span={[12, 12, 9]}>
							<TransactionsTable />
						</Cell>
					</Grid>
				</Block>
			</Container>
		</>
	);
};

export default Billing;

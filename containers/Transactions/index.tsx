import React, { Fragment } from 'react';
import moment from 'moment';
import { NextPage } from 'next';
import { Block } from 'baseui/block';
import { StyledTable, StyledBodyCell } from 'baseui/table-grid';
import { MdCloudDownload } from 'react-icons/md';
import { TransactionType } from '@stoqey/client-graphql';
import SvgIcon from 'components/UiElements/SvgIcon/SvgIcon';
import { TextButton } from 'components/PageStyles/Settings.styled';
import { StyledTableHeadAlt, StyledTableBodyCell } from 'components/PageStyles/Apps.styled';
import { getTransactionsPaginationApi } from './transaction.api';

import billingPageData from '../../data/billingPage';
import { useApolloClient } from '@apollo/client';
import { isEmpty } from 'lodash';

const TransactionsTable: NextPage<{}> = () => {
	const client = useApolloClient();
	const [transactions, setTransactions] = React.useState<TransactionType[]>([]);

	React.useEffect(() => {

		getTransactionsPaginationApi({
			client,
			args: {

			},
			success: async (trans: any[]) => {
				setTransactions(trans);
			},
			error: async () => {

			}
		});

	}, [])
	return (
		<>
			<Block
				paddingTop={['10px', '20px', '30px', '0']}
				overrides={{ Block: { style: { minHeight: '150px' } } }}
			>
				<StyledTable $gridTemplateColumns="auto auto auto">
					<StyledTableHeadAlt>Date</StyledTableHeadAlt>
					<StyledTableHeadAlt>Method</StyledTableHeadAlt>
					<StyledTableHeadAlt>Amount</StyledTableHeadAlt>
					{/* <StyledTableHeadAlt>Receipt</StyledTableHeadAlt> */}
					{transactions.map((item, index) => {
						const striped = index % 2 === 0;
						const createdAt = item && item.createdAt;
						return (
							<Fragment key={index}>
								{/* <StyledBodyCell $striped={striped}>
									<SvgIcon
										src={require('assets/images/check.svg?include')}
									/>{' '}
								</StyledBodyCell> */}
								<StyledTableBodyCell $striped={striped} $isCenter>
									{!isEmpty(createdAt) ? moment(createdAt).fromNow() : ""}
								</StyledTableBodyCell>
								<StyledTableBodyCell $striped={striped} $isCenter>
									{item.source}
								</StyledTableBodyCell>
								<StyledTableBodyCell $striped={striped} $isCenter>
									{item.amount}
								</StyledTableBodyCell>
								{/* <StyledBodyCell $striped={striped}>
									<TextButton onClick={() => alert('click')}>
										<MdCloudDownload size="1.2rem" color="#545454" />
									</TextButton>
								</StyledBodyCell> */}
							</Fragment>
						);
					})}
				</StyledTable>
			</Block>
		</>
	);
};

export default TransactionsTable;

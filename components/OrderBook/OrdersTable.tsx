import React, { Fragment } from 'react';
import { NextPage } from 'next';
import { Block } from 'baseui/block';
import { StyledTable, StyledBodyCell } from 'baseui/table-grid';
import { MdCloudDownload } from 'react-icons/md';
import { OrderType } from '@stoqey/client-graphql';
import SvgIcon from 'components/UiElements/SvgIcon/SvgIcon';
import { TextButton } from 'components/PageStyles/Settings.styled';
import { StyledTableHeadAlt } from 'components/PageStyles/Apps.styled';

interface Props {
    orders: OrderType[]
}
const OrdersTable: NextPage<{ orders }> = ({ orders }: Props) => {

	return (
		<>
			<Block
				paddingTop={['10px', '20px', '30px', '0']}
				overrides={{ Block: { style: { minHeight: '150px' } } }}
			>
				<StyledTable $gridTemplateColumns="max-content auto auto auto max-content">
					<StyledTableHeadAlt>ID</StyledTableHeadAlt>
					<StyledTableHeadAlt>Date</StyledTableHeadAlt>
					<StyledTableHeadAlt>Payment method</StyledTableHeadAlt>
					<StyledTableHeadAlt>Amount</StyledTableHeadAlt>
					<StyledTableHeadAlt>Receipt</StyledTableHeadAlt>
					{orders.map((item, index) => {
						const striped = index % 2 === 0;
						return (
							<Fragment key={index}>
								<StyledBodyCell $striped={striped}>
									<SvgIcon
										src={require('assets/images/check.svg?include')}
									/>{' '}
									{item.id}
								</StyledBodyCell>
								<StyledBodyCell $striped={striped}>
									{item.createdAt}
								</StyledBodyCell>
								<StyledBodyCell $striped={striped}>
									{item.source}
								</StyledBodyCell>
								<StyledBodyCell $striped={striped}>
									{item.amount}
								</StyledBodyCell>
								<StyledBodyCell $striped={striped}>
									<TextButton onClick={() => alert('click')}>
										<MdCloudDownload size="1.2rem" color="#545454" />
									</TextButton>
								</StyledBodyCell>
							</Fragment>
						);
					})}
				</StyledTable>
			</Block>
		</>
	);
};

export default OrdersTable;

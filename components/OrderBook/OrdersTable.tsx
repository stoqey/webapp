import React, { Fragment } from 'react';
import { NextPage } from 'next';
import { Block } from 'baseui/block';
import { StyledTable, StyledBodyCell } from 'baseui/table-grid';
import { MdCloudDownload } from 'react-icons/md';
import { OrderType } from '@stoqey/client-graphql';
import SvgIcon from 'components/UiElements/SvgIcon/SvgIcon';
import { TextButton } from 'components/PageStyles/Settings.styled';
import { StyledTableHeadAlt } from 'components/PageStyles/Apps.styled';
const stoqeyLogo = require('assets/images/STQ.png');

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
                    <StyledTableHeadAlt></StyledTableHeadAlt>
                    <StyledTableHeadAlt>Symbol</StyledTableHeadAlt>
                    <StyledTableHeadAlt>Actn</StyledTableHeadAlt>
                    <StyledTableHeadAlt>Type</StyledTableHeadAlt>
                    <StyledTableHeadAlt>Qty</StyledTableHeadAlt>
                    <StyledTableHeadAlt>Filled</StyledTableHeadAlt>
                    <StyledTableHeadAlt></StyledTableHeadAlt>
                    {orders.map((item, index) => {
                        const striped = index % 2 === 0;
                        return (
                            <Fragment key={index}>
                                <StyledBodyCell $striped={striped}>
                                    <SvgIcon src={stoqeyLogo} />
                                </StyledBodyCell>
                                <StyledBodyCell $striped={striped}>
                                    {item.instrument}
                                </StyledBodyCell>
                                <StyledBodyCell $striped={striped}>
                                    {item.action}
                                </StyledBodyCell>
                                <StyledBodyCell $striped={striped}>
                                    {item.type}
                                </StyledBodyCell>
                                <StyledBodyCell $striped={striped}>
                                    {item.qty}
                                </StyledBodyCell>
                                <StyledBodyCell $striped={striped}>
                                    {item.qty - item.filledQty}
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

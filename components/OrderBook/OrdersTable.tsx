import React, { Fragment } from 'react';
import { NextPage } from 'next';
import { Block } from 'baseui/block';
import { StyledTable, StyledBodyCell } from 'baseui/table-grid';
import { MdCloudDownload } from 'react-icons/md';
import { OrderType } from '@stoqey/client-graphql';
import SvgIcon from 'components/UiElements/SvgIcon/SvgIcon';
import { TextButton } from 'components/PageStyles/Settings.styled';
import { StyledTableHeadAlt } from 'components/PageStyles/Apps.styled';
import { isEmpty } from 'lodash';
import { useUserInfo } from 'hooks/useUserInfo';
import { Button } from 'baseui/button';
import { ImCross } from 'react-icons/im';
import { Tag } from 'baseui/tag';
const stoqeyLogo = require('assets/images/STQ.png');

interface Props {
    orders: OrderType[];
    userId?: string;
}
const OrdersTable: NextPage<Props> = ({ orders, userId }: Props) => {
    return (
        <>
            <Block
                paddingTop={['10px', '20px', '30px', '0']}
                overrides={{ Block: { style: { minHeight: '150px' } } }}
            >

                <StyledTable $gridTemplateColumns="max-content auto auto auto max-content">
                    <StyledTableHeadAlt>State</StyledTableHeadAlt>
                    <StyledTableHeadAlt>Action</StyledTableHeadAlt>
                    <StyledTableHeadAlt>PriceType</StyledTableHeadAlt>
                    <StyledTableHeadAlt>Qty</StyledTableHeadAlt>
                    <StyledTableHeadAlt></StyledTableHeadAlt>
                    {!isEmpty(orders) && orders.map((item, index) => {
                        const { clientId: owner, filledQty, qty } = item;
                        const isMine = owner === userId;
                        const isFilled = filledQty === qty;
                        const striped = index % 2 === 0;
                        return (
                            <Fragment key={index}>
                                <StyledBodyCell $striped={striped}>
                                    <Tag
                                        closeable={false}
                                        variant="outlined"
                                        kind="positive"
                                    >
                                        success
                                    </Tag>
                                </StyledBodyCell>

                                <StyledBodyCell $striped={striped}>
                                    {item.action}
                                </StyledBodyCell>

                                <StyledBodyCell $striped={striped}>
                                    {item.type}
                                </StyledBodyCell>

                                <StyledBodyCell $striped={striped}>
                                    {item.qty} / {item.filledQty}
                                </StyledBodyCell>

                                {isMine ? (
                                    <StyledBodyCell $striped={striped}>
                                        <Button shape="round" kind="primary" onClick={() => { }}>
                                            <ImCross color="red" />
                                        </Button>
                                    </StyledBodyCell>
                                ) : (
                                    <StyledBodyCell $striped={striped}>
                                        <Button shape="round" kind="secondary" onClick={() => { }}>
                                            ✅
                                        </Button>
                                    </StyledBodyCell>
                                )}

                            </Fragment>
                        );
                    })}
                </StyledTable>
            </Block>
        </>
    );
};

export default OrdersTable;

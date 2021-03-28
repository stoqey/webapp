import React, { Fragment } from 'react';
import { NextPage } from 'next';
import { Block } from 'baseui/block';
import { StyledTable } from 'baseui/table-grid';
import { MdCloudDownload } from 'react-icons/md';
import { OrderType } from '@stoqey/client-graphql';
import SvgIcon from 'components/UiElements/SvgIcon/SvgIcon';
import { TextButton } from 'components/PageStyles/Settings.styled';
import { StyledTableHeadAlt, StyledTableBodyCell } from 'components/PageStyles/Apps.styled';
import { isEmpty } from 'lodash';
import { useUserInfo } from 'hooks/useUserInfo';
import { Button } from 'baseui/button';
import { ImCross } from 'react-icons/im';
import { Tag } from 'baseui/tag';
const stoqeyLogo = require('assets/images/STQ.png');

interface Props {
    orders: OrderType[];
    userId?: string;
    onCancelOrder?: (order: OrderType) => Promise<any>;
}
const OrdersTable: NextPage<Props> = ({ orders, userId, onCancelOrder }: Props) => {
    return (
        <>
            <Block
                paddingTop={['10px', '20px', '30px', '0']}
                overrides={{ Block: { style: { minHeight: '150px', textAlign: "center" } } }}
            >

                <StyledTable $gridTemplateColumns="max-content auto auto max-content">
                    <StyledTableHeadAlt>State</StyledTableHeadAlt>
                    <StyledTableHeadAlt>Action {"->"} PriceType </StyledTableHeadAlt>
                    <StyledTableHeadAlt>Qty</StyledTableHeadAlt>
                    <StyledTableHeadAlt></StyledTableHeadAlt>
                    {!isEmpty(orders) && orders.map((item: OrderType, index) => {
                        const { clientId: owner, filledQty, qty, canceled, id: orderId } = item;
                        const isMine = owner === userId;
                        const isFilled = filledQty === qty;
                        const striped = index % 2 === 0;

                        const [colour, statusText] = (() => {
                            if (canceled) {
                                return ["negative", "CANCELED"]
                            }
                            if (isFilled) {
                                return ["positive", "SUCCESS"]
                            }
                            return ["warning", "LIVE"];
                        })();

                        const cannotBeCanceled = isFilled || canceled;

                        return (
                            <Fragment key={index}>
                                <StyledTableBodyCell $striped={striped}>
                                    <Tag
                                        closeable={false}
                                        variant="outlined"
                                        kind={colour as any}
                                    >
                                        {statusText}
                                    </Tag>
                                </StyledTableBodyCell>

                                <StyledTableBodyCell $striped={striped}>
                                    {item.action} {"->"} {item.type}
                                </StyledTableBodyCell>

                                <StyledTableBodyCell $striped={striped}>
                                    {item.qty} / {item.filledQty}
                                </StyledTableBodyCell>

                                {isMine && !cannotBeCanceled ? (
                                    <StyledTableBodyCell $striped={striped}>
                                        <Button size="default" shape="round" kind="secondary" onClick={() => onCancelOrder(item)}>
                                            <ImCross color="red" />
                                        </Button>
                                    </StyledTableBodyCell>
                                ) : (
                                    <StyledTableBodyCell $striped={striped}>
                                        
                                    </StyledTableBodyCell>
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

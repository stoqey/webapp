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
                overrides={{ Block: { style: { minHeight: '150px', textAlign: "center" } } }}
            >

                <StyledTable $gridTemplateColumns="max-content auto auto max-content">
                    <StyledTableHeadAlt>State</StyledTableHeadAlt>
                    <StyledTableHeadAlt>Action {"->"} PriceType </StyledTableHeadAlt>
                    <StyledTableHeadAlt>Qty</StyledTableHeadAlt>
                    <StyledTableHeadAlt></StyledTableHeadAlt>
                    {!isEmpty(orders) && orders.map((item: OrderType, index) => {
                        const { clientId: owner, filledQty, qty, canceled } = item;
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
                                <StyledBodyCell $striped={striped}>
                                    <Tag
                                        closeable={false}
                                        variant="outlined"
                                        kind={colour}
                                    >
                                        {statusText}
                                    </Tag>
                                </StyledBodyCell>

                                <StyledBodyCell $striped={striped}>
                                    {item.action} {"->"} {item.type}
                                </StyledBodyCell>

                                <StyledBodyCell $striped={striped}>
                                    {item.qty} / {item.filledQty}
                                </StyledBodyCell>

                                {isMine && !cannotBeCanceled ? (
                                    <StyledBodyCell $striped={striped}>
                                        <Button shape="round" kind="primary" onClick={() => { }}>
                                            <ImCross color="red" />
                                        </Button>
                                    </StyledBodyCell>
                                ) : (
                                    <StyledBodyCell $striped={striped}>
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

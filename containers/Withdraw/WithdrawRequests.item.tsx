import { WithdrawRequestType, StatusType } from '@stoqey/client-graphql';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import { H3, Paragraph3 } from 'baseui/typography';
import React from 'react';
import { ImCross } from 'react-icons/im';
import { BsArrowClockwise } from 'react-icons/bs';
import { FaArrowCircleRight, FaCheck, FaEdit } from 'react-icons/fa';

const statusObject = {
    [StatusType.DRAFT]: ["Draft", "grey", FaEdit],
    [StatusType.PENDING]: ["Pending", "orange", BsArrowClockwise],
    [StatusType.SUBMITTED]: ["Submitted", "orange", FaArrowCircleRight],
    [StatusType.PROCESSING]: ["Processing", "gold", BsArrowClockwise],
    [StatusType.SUCCESS]: ["Successfully processed", "green", FaCheck],
    [StatusType.FAIL]: ["Failed request", "red", BsArrowClockwise],
    [StatusType.CANCELED]: ["Canceled request", "red", BsArrowClockwise],
    [StatusType.REJECTED]: ["Rejected request", "red", BsArrowClockwise],
};

export const WithdrawRequestItem = (props: WithdrawRequestType & { deleteItem: (item: Partial<WithdrawRequestType>) => void }) => {
    const { amount, notes = "", deleteItem } = props;

    const status = props && props.status || "pending";
    const [statusText, color, Icon] = statusObject[status];

    const cannotBeCanceled = [StatusType.REJECTED, StatusType.FAIL, StatusType.SUCCESS].includes(status);

    return <div style={{ textAlign: "center", border: "black solid 0.5px", margin: "2px", padding: "10px" }}>

        <Paragraph3>Some status about the transaction</Paragraph3>

        <Block display="flex" width="100%" justifyContent="space-between">

            <Button shape="round" $style={{ backgroundColor: color }}
                onClick={() => { }}>
                <Icon />
            </Button>

            <H3>{amount}</H3>

            <Button disabled={cannotBeCanceled} shape="round" $style={{ backgroundColor: 'red' }}
                onClick={() => deleteItem(props)}>
                <ImCross />
            </Button>

        </Block>

        <Paragraph3>{notes} + {statusText}</Paragraph3>

    </div>
}

export default WithdrawRequestItem;
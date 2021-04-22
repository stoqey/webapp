import { WithdrawRequestType, StatusType } from '@stoqey/client-graphql';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import { H3, Paragraph3 } from 'baseui/typography';
import React from 'react';
import { ImCross } from 'react-icons/im';
import { TiArrowSyncOutline } from 'react-icons/ti';
import { BsArrowClockwise } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';


const getStatusText = (status: StatusType): any[] => {
    switch (status) {
        case StatusType.PROCESSING:
            return ["Processing transaction", "green", BsArrowClockwise];
        case StatusType.REJECTED:
        case StatusType.FAIL:
            return ["Processing transaction", "red", BsArrowClockwise];
        case StatusType.DRAFT:
            return ["Processing transaction", "red", BsArrowClockwise];
        case StatusType.PENDING:
            return ["some success string", "orange", BsArrowClockwise];
        case StatusType.SUCCESS:
            return ["successfully processed", "green", FaCheck];
        default:
            return ["some default string", "blue", ImCross];
    }
};

export const WithdrawRequestItem = (props: WithdrawRequestType) => {
    const { status, amount, notes = "" } = props;

    const [statusText, color, Icon] = getStatusText(status);

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
                onClick={() => { }}>
                <ImCross />
            </Button>

        </Block>

        <Paragraph3>{notes} + {statusText}</Paragraph3>

    </div>
}

export default WithdrawRequestItem;
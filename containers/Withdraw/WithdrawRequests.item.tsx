import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import { H3, Paragraph3 } from 'baseui/typography';
import React from 'react';
import { ImCross } from 'react-icons/im';

export const WithdrawRequestItem = () => {
    return <div style={{ textAlign: "center" }}>

        <Paragraph3>Some status about the transaction</Paragraph3>

        <Block display="flex" width="100%" justifyContent="space-between">

            <Button shape="round" $style={{ backgroundColor: 'blueviolet' }}
                onClick={() => { }}>
                <ImCross />
            </Button>

            <H3> 1, 000</H3>
            <Button shape="round" $style={{ backgroundColor: 'red' }}
                onClick={() => { }}>
                <ImCross />
            </Button>

        </Block>

        <Paragraph3>Some status about the transaction</Paragraph3>

    </div>
}

export default WithdrawRequestItem;
import React from 'react';
import { StatusType, PaymentMethodType, WithdrawPaymentMethodType } from '@stoqey/client-graphql';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import { H3, Paragraph3 } from 'baseui/typography';
import { ImCross } from 'react-icons/im';
import { BsArrowClockwise } from 'react-icons/bs';
import { FaArrowCircleRight, FaCheck, FaEdit } from 'react-icons/fa';


const withdrawPaymentTypeObject = {
    [WithdrawPaymentMethodType.BANK]: ["Draft", "grey", FaEdit],
    [WithdrawPaymentMethodType.MOBILEMONEY]: ["Pending", "orange", BsArrowClockwise],
    [WithdrawPaymentMethodType.ETRANSFER]: ["Submitted", "orange", FaArrowCircleRight],
};


interface Props {
    items: PaymentMethodType[];
    setSelected?: (selected: PaymentMethodType) => void
    deleteItem: (id: string) => void
};

export const PaymentMethodLists = (props: Props) => {
    const { items, setSelected, deleteItem } = props;

    return (
        items.map((i) => {
            const { name, info } = i;
            const paymentMethodType: WithdrawPaymentMethodType  = i && i.type as WithdrawPaymentMethodType || WithdrawPaymentMethodType.BANK;
            const [label, color, Icon] = withdrawPaymentTypeObject[paymentMethodType];

            return (
                <div key={i.id} style={{ textAlign: "center", border: "black solid 0.5px", margin: "2px", padding: "10px" }}>
                    <Paragraph3>Some status about the transaction</Paragraph3>

                    <Block display="flex" width="100%" justifyContent="space-between">

                        <Button shape="round" $style={{ backgroundColor: color }}
                            onClick={() => { }}>
                            <Icon />
                        </Button>

                        <H3>{name}</H3>

                        <Button shape="round" $style={{ backgroundColor: 'red' }}
                            onClick={() => deleteItem(i.id)}>
                            <ImCross />
                        </Button>

                    </Block>

                    <Paragraph3>{info}</Paragraph3>

                </div>
            )
        })
    )
}
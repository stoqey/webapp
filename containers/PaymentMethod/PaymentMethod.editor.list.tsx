import React from 'react';
import { StatusType, PaymentMethodType, WithdrawPaymentMethodType } from '@stoqey/client-graphql';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import { H3, H5, Paragraph1, Paragraph3, ParagraphMedium, ParagraphXSmall } from 'baseui/typography';
import { ImCross } from 'react-icons/im';
import { BsArrowClockwise } from 'react-icons/bs';
import { RiBankFill } from 'react-icons/ri';
import { FaArrowCircleRight, FaBitcoin, FaCheck, FaEdit } from 'react-icons/fa';


const withdrawPaymentTypeObject = {
    [WithdrawPaymentMethodType.CRYPTO]: FaBitcoin,
    [WithdrawPaymentMethodType.BANK]: RiBankFill,
    [WithdrawPaymentMethodType.MOBILEMONEY]: BsArrowClockwise,
    [WithdrawPaymentMethodType.ETRANSFER]: FaArrowCircleRight,
};


interface Props {
    items: PaymentMethodType[];
    setSelected?: (selected: PaymentMethodType) => void
    deleteItem: (id: string) => void
};

export const PaymentMethodLists = (props: Props) => {
    const { items, setSelected: handleSelected, deleteItem } = props;

    const [selected, setSelected] = React.useState<PaymentMethodType>(items[0])

    return (
        items.map((i) => {
            const { name, info, type, id } = i;
            const paymentMethodType: WithdrawPaymentMethodType = i && i.type as WithdrawPaymentMethodType || WithdrawPaymentMethodType.BANK;
            const Icon = withdrawPaymentTypeObject[paymentMethodType] || withdrawPaymentTypeObject[WithdrawPaymentMethodType.BANK];


            const isSelected = selected && selected.id === id;
            return (
                <div onClick={() => { setSelected(i); handleSelected(i) }} key={i.id} style={{ border: !isSelected ? "grey solid 0.5px" : "black solid 0.5px", margin: "2px", padding: "6px" }}>

                    <p style={{ display: "flex", justifyContent: "space-between" }}>
                        <Paragraph3> {isSelected? "✅": ""} <Icon size={15} /> {type.toLocaleUpperCase()}</Paragraph3>
                        <ParagraphMedium $style={{ color: "red" }}><ImCross size={15} /></ParagraphMedium>
                    </p>

                    <p style={{ textAlign: "center" }}>
                        <ParagraphMedium $style={{ textAlign: "center" }}>{name}</ParagraphMedium>
                    </p>

                    <ParagraphXSmall $style={{ textAlign: "center" }}>{(info || "").slice(0, 10)}{"..."}</ParagraphXSmall>
                </div>
            )
        })
    )
}
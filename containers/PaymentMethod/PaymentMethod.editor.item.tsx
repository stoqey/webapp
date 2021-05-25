import React from 'react';
import { StatusType, PaymentMethodType, WithdrawPaymentMethodType } from '@stoqey/client-graphql';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import { H3, H5, Paragraph1, Paragraph3, ParagraphMedium, ParagraphXSmall } from 'baseui/typography';
import { ImCross } from 'react-icons/im';
import { IoPhonePortraitSharp } from 'react-icons/io5';
import { RiBankFill, RiMailSendFill } from 'react-icons/ri';
import { FaArrowCircleRight, FaBitcoin, FaCheck, FaEdit } from 'react-icons/fa';


const withdrawPaymentTypeObject = {
    default: FaEdit,
    [WithdrawPaymentMethodType.CRYPTO]: FaBitcoin,
    [WithdrawPaymentMethodType.BANK]: RiBankFill,
    [WithdrawPaymentMethodType.MOBILEMONEY]: IoPhonePortraitSharp,
    [WithdrawPaymentMethodType.ETRANSFER]: RiMailSendFill,
};

interface Props extends PaymentMethodType {
    isSelected?: boolean;
    setSelected: (selected: PaymentMethodType) => void;
    deleteItem: (selected: PaymentMethodType) => void;
}

export const PaymentMethodItem = (i: Props) => {
    const { name, info, type, id, isSelected = false, setSelected, deleteItem } = i;
    const paymentMethodType: WithdrawPaymentMethodType = i && i.type as WithdrawPaymentMethodType || WithdrawPaymentMethodType.BANK;
    const Icon = withdrawPaymentTypeObject[paymentMethodType] || withdrawPaymentTypeObject["default"];
            return (
                <div onClick={() => setSelected(i)} key={i.id} style={{ border: !isSelected ? "grey solid 0.5px" : "black solid 0.5px", margin: "2px", padding: "6px" }}>

                    <p style={{ display: "flex", justifyContent: "space-between" }}>
                        <Paragraph3> {isSelected ? "✅" : ""} <Icon size={15} /> {type.toLocaleUpperCase()}</Paragraph3>

                        {/* <ParagraphMedium $style={{ color: "red" }}>

                            <Button
                                size="mini"
                                shape="round"
                                $style={{ backgroundColor: 'red' }}
                                onClick={() => deleteItem(i)}
                            >
                                <ImCross size={15} />
                            </Button>

                        </ParagraphMedium> */}
                    </p>

                    <p style={{ textAlign: "center" }}>
                        <ParagraphMedium $style={{ textAlign: "center" }}>{name}</ParagraphMedium>
                    </p>

                    <ParagraphXSmall $style={{ textAlign: "center" }}>{(info || "").slice(0, 10)}{"..."}</ParagraphXSmall>
                </div>
            )
 
    
}
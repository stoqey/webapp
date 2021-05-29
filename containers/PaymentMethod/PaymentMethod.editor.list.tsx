import React from 'react';
import { StatusType, PaymentMethodType, WithdrawPaymentMethodType } from '@stoqey/client-graphql';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import { H3, H5, Paragraph1, Paragraph3, ParagraphMedium, ParagraphXSmall } from 'baseui/typography';
import { ImCross } from 'react-icons/im';
import { IoPhonePortraitSharp } from 'react-icons/io5';
import { RiBankFill, RiMailSendFill } from 'react-icons/ri';
import { FaArrowCircleRight, FaBitcoin, FaCheck, FaEdit } from 'react-icons/fa';
import ConfirmModal, { ConfirmModelProps } from '@/components/Confirm.modal';


const withdrawPaymentTypeObject = {
    default: FaEdit,
    [WithdrawPaymentMethodType.CRYPTO]: FaBitcoin,
    [WithdrawPaymentMethodType.BANK]: RiBankFill,
    [WithdrawPaymentMethodType.MOBILEMONEY]: IoPhonePortraitSharp,
    [WithdrawPaymentMethodType.ETRANSFER]: RiMailSendFill,
};


interface Props {
    items: PaymentMethodType[];
    setSelected?: (selected: PaymentMethodType) => void
    deleteItem: (paymentMethod: PaymentMethodType) => void
};

interface State {
    selected: PaymentMethodType;
    dialog: ConfirmModelProps;
}

export const PaymentMethodLists = (props: Props) => {
    const { items, setSelected: handleSelected, deleteItem } = props;

    const [state, setState] = React.useState<State>({
        selected: items[0],
        dialog: {
            show: false,
            title: "",
            description: "",
            status: StatusType.DRAFT,
            actions: null
        }
    })

    const { dialog, selected } = state;

    const setSelected = (sel: any) => setState({ ...state, selected: sel });

    const hideModal = () => setState({ ...state, dialog: { ...state.dialog, show: !state.dialog.show } });

    const deletePaymentMethod = (paymentMethodObj: PaymentMethodType) => {
        console.log('delete item', paymentMethodObj);
        setState({
            ...state,
            dialog: {
                show: true,
                description: `Are you sure you want to delete ${paymentMethodObj.name}`,
                title: `Delete ${paymentMethodObj.name}`,
                status: StatusType.DRAFT,
                actions: {
                    cancel: {
                        onPress: () => hideModal(),
                        title: "Cancel"
                    },
                    confirm: {
                        title: "Delete payment method",
                        onPress: () => deleteItem(paymentMethodObj)
                    }
                },
            }
        })
    }

    return (<>
        <ConfirmModal {...dialog} />
        {items.map((i) => {
            const { name, info, type, id } = i;
            const paymentMethodType: WithdrawPaymentMethodType = i && i.type as WithdrawPaymentMethodType || WithdrawPaymentMethodType.BANK;
            const Icon = withdrawPaymentTypeObject[paymentMethodType] || withdrawPaymentTypeObject["default"];


            const isSelected = selected && selected.id === id;
            return (
                <div onClick={() => { setSelected(i); handleSelected(i) }} key={i.id} style={{ border: !isSelected ? "grey solid 0.5px" : "black solid 0.5px", margin: "2px", padding: "6px" }}>

                    <p style={{ display: "flex", justifyContent: "space-between" }}>
                        <Paragraph3> {isSelected ? "✅" : ""} <Icon size={15} /> {type.toLocaleUpperCase()}</Paragraph3>

                        <ParagraphMedium $style={{ color: "red" }}>

                            <Button
                                size="mini"
                                shape="round"
                                $style={{ backgroundColor: 'red' }}
                                onClick={() => deletePaymentMethod(i)}
                            >
                                <ImCross size={15} />
                            </Button>

                        </ParagraphMedium>
                    </p>

                    <p style={{ textAlign: "center" }}>
                        <ParagraphMedium $style={{ textAlign: "center" }}>{name}</ParagraphMedium>
                    </p>

                    <ParagraphXSmall $style={{ textAlign: "center" }}>{(info || "").slice(0, 10)}{"..."}</ParagraphXSmall>
                </div>
            )
        }
        )}
    </>)

}
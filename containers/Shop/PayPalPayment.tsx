import React, { useState } from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import { Modal, ModalBody } from 'baseui/modal';
import { PayPalButton } from "react-paypal-button-v2";
import { processPayment } from './api';
import { useApolloClient } from '@apollo/client';
import { FaHandHoldingUsd } from 'react-icons/fa';
import { StatefulPopover } from "baseui/popover";
import { H6 } from 'baseui/typography';
import PaymentResults from './PaymentResult.dialog';

interface Props {
  userId: string;
  amount: number;
};

interface PayPalFormProps {
  userId: string;
  amount: number;
  onSuccess: (orderId: string) => Promise<any>;
};

const PayPalForm = (props: PayPalFormProps) => {
  const { userId, amount = 30, onSuccess } = props;
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "AeTaBjLsajBbU4SSXYu1DIH7MOaA6hNRcqKZuhOdfGz4YKv2TxNufduBnmlUN0TNwsrM_3VAnfN2MJew";
  console.log('PayPal client id', { clientId, userId, amount });
  return (
    <PayPalButton
      options={{
        clientId
      }}
      currency="USD"
      amount={amount}
      shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
      onSuccess={async (details, data) => {
        console.log('Paypal success', data);
        return await onSuccess(data && data.orderID);
      }}
    />
  );
}

const PayPalPayment = (props: Props) => {
  const { userId, amount } = props;
  const client = useApolloClient();
  const [showResponse, setShowResponse] = useState(true);


  const paymentApi = async (orderId: string) => await processPayment({
    client,
    args: { orderId, owner: userId, amount: +amount },
    success: async (data: any) => {
      console.log('successfuly processed payment', data);
      setShowResponse(true); // show success
    },
    error: async (error: Error) => {
      console.log('error submitting payment', error);
    }
  })

  // FaHandHoldingUsd
  return (
    <Block marginLeft="-16px" marginRight="-16px">

      <StatefulPopover
        content={() => (
          <Block padding="15px" $style={{ textAlign: "center"}}>
            <h3>Send any amount to support@stoqey.com, please add your account's phone number as the message</h3>
          </Block>
        )}
        returnFocus
        autoFocus
      >
        <Button
          shape="square"
          overrides={{
            Root: {
              style: () => {
                return { width: "100%", fontSize: "20px", borderRadius: "5px", height: "55px", marginBottom: "17px" };
              },
            },
          }}
        >
          <FaHandHoldingUsd size={30} style={{ margin: "10px" }} />
          <h4>E-transfer</h4>
        </Button>
      </StatefulPopover>
      {/* PayPal form */}
      <PayPalForm {...props} onSuccess={paymentApi} />

      {/* Model success */}
      <PaymentResults show={showResponse} hide={() => setShowResponse(false)} />
    </Block>
  );
};

export default PayPalPayment;

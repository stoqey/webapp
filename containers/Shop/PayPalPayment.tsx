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
import ResultsDialog from '@/components/Modal/Result.dialog';

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
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

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

interface State {
  showResults: boolean;
  message: string;
  success: boolean;
}

const PayPalPayment = (props: Props) => {
  const { userId, amount } = props;
  const client = useApolloClient();

  const [state, setState] = useState<State>({
    showResults: false,
    message: "Error processing payment",
    success: false,
  });


  const paymentApi = async (orderId: string) => {
    await processPayment({
      client,
      args: { orderId, owner: userId, amount: +amount },
      success: async (data: any) => {
        console.log('successfuly processed payment', data);
        setState({
          ...state,
          message: `Successfuly processed payment of $${amount}`,
          success: true,
        });
      },
      error: async (error: Error) => {
        console.log('error submitting payment', error);
        setState({
          ...state,
          message: `Error processing payment of $${amount}`,
          success: false,
        });
      }
    });
  }

  const hide = () => {
    setState({
      ...state,
      showResults: false
    })
  };

  const { message, showResults, success } = state;

  return (
    <Block marginLeft="-16px" marginRight="-16px">

      <StatefulPopover
        content={() => (
          <Block padding="15px" $style={{ textAlign: "center" }}>
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
      <ResultsDialog title={message} success={success} show={showResults} hide={hide}
        content={[
          { title: "Amount", value: +amount },
        ]}
      />
    </Block>
  );
};

export default PayPalPayment;

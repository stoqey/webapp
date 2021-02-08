import React, { useState } from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import { Modal, ModalBody } from 'baseui/modal';
import { PayPalButton } from "react-paypal-button-v2";
import { processPayment } from './api';
import { useApolloClient } from '@apollo/client';

interface Props {
  userId: string;
  amount: number;
  onSuccess: (orderId: string) => Promise<any>;
};

const PayPalForm = (props: Props) => {
  const { userId, amount = 30, onSuccess } = props;
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "AeTaBjLsajBbU4SSXYu1DIH7MOaA6hNRcqKZuhOdfGz4YKv2TxNufduBnmlUN0TNwsrM_3VAnfN2MJew";
  console.log('PayPal client id', { clientId, userId, amount });
  return (
    <PayPalButton
      options={{
        clientId,
        debug: true
      }}
      currency="USD"
      amount={amount}
      shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
      onSuccess={async (details, data) => {
        return await onSuccess(data && data.orderID);
      }}
    />
  );
}

const PayPalPayment = (props: Props) => {
  const { userId, amount } = props;
  const client = useApolloClient();
  const [visible, setVisible] = useState(false);


  const paymentApi = async (orderId: string) => await processPayment({
    client,
    args: { orderId, owner: userId, amount },
    success: async (data: any) => {
      console.log('successfuly processed payment', data);
      setVisible(true); // show success
    },
    error: async (error: Error) => {
      console.log('error submitting payment', error);
    }
  })


  return (
    <Block marginLeft="-16px" marginRight="-16px">

      {/* PayPal form */}
      <PayPalForm {...props} onSuccess={paymentApi} />


      {/* Model success */}
      <Modal
        onClose={() => {
          setVisible(false);
        }}
        closeable
        isOpen={visible}
        animate
        size="default"
        role="dialog"
        unstable_ModalBackdropScroll={true}
        overrides={{
          Root: {
            style: () => {
              return { zIndex: 9999 };
            },
          },
        }}
      >
        <ModalBody style={{ overflow: 'hidden' }}>
          <Block
            overrides={{
              Block: {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '45px 30px',
                },
              },
            }}
          >
            <IoIosCheckmarkCircleOutline
              size="4em"
              color="#3AA76D"
              style={{ marginBottom: '20px' }}
            />

            <Block
              as="h2"
              overrides={{
                Block: {
                  style: ({ $theme }) => {
                    return {
                      ...$theme.typography.font750,
                      color: $theme.colors.primary,
                      marginBottom: '30px',
                      '@media only screen and (max-width: 480px)': {
                        ...$theme.typography.font650,
                        marginBottom: '20px',
                      },
                    };
                  },
                },
              }}
            >
              Order Placed
            </Block>

            <Block as="p" marginBottom="15px">
              <Block
                as="strong"
                overrides={{
                  Block: {
                    style: ({ $theme }) => {
                      return { color: $theme.colors.primary };
                    },
                  },
                }}
              >
                Order ID :{' '}
              </Block>
              <Block as="span">xxxxx</Block>
            </Block>

            <Block as="p" marginBottom="15px">
              <Block
                as="strong"
                overrides={{
                  Block: {
                    style: ({ $theme }) => {
                      return { color: $theme.colors.primary };
                    },
                  },
                }}
              >
                Delivery :{' '}
              </Block>
              <Block as="span">instant</Block>
            </Block>

            <Block as="p" marginBottom="15px">
              <Block
                as="strong"
                overrides={{
                  Block: {
                    style: ({ $theme }) => {
                      return { color: $theme.colors.primary };
                    },
                  },
                }}
              >
                Thanks for your investing in Stoqey {' '}
              </Block>
              <Block as="span">
                Now you can go to the portfolio screen and buy shares in Stoqey
                Happy investing with Stoqey
              </Block>
            </Block>
          </Block>
        </ModalBody>
      </Modal>
    </Block>
  );
};

export default PayPalPayment;

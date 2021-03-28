import React, { useState } from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { Block } from 'baseui/block';
import { Modal, ModalBody } from 'baseui/modal';
import { useApolloClient } from '@apollo/client';

import { Grid, Cell } from 'baseui/layout-grid';
import { MarketDataType, PortfolioType } from '@stoqey/client-graphql';
import { FaShoppingBag, FaMapMarkerAlt, FaMoneyCheckAlt, FaMoneyBillWave, FaPaypal, FaCreditCard, FaPiggyBank, FaBitcoin } from 'react-icons/fa';
import { Button } from 'baseui/button';
import { Input } from 'baseui/input';
import Container from 'components/UiElements/Container/Container';
import PageTitle from 'components/UiElements/PageTitle/PageTitle';
import CurrencyCart from 'containers/Shop/CurrencyCart';
import PayPalPayment from 'containers/Shop/PayPalPayment';
import {
  MenuStep,
  ListItem,
  Title,
  PriceList,
  PriceItem,
} from 'components/PageStyles/Checkout.styled';

interface Props {
  show: boolean;
  hide?: () => void;
  orderId?: string;
  onError?: (message: string) => void;
  onSuccess?: (message: string) => void;
};


const CancelOrder = (props: Props) => {
  const { show, hide, orderId, onError, onSuccess } = props;

  const client = useApolloClient();

  const cancelTheOrderApi  = async () => {
    // await closePortfolioMutation({
    //   client,
    //   args: { id: portfolioId },
    //   success: async (d: any) => {
    //     onSuccess(`Successfully close position`)
    //     hide();
    //   },
    //   error: async (e: Error) => {
    //     onError(e && e.message)
    //   },
    // })
  }

  return (
    <>
      {/* Model success */}
      <Modal
        onClose={() => hide()}
        closeable
        isOpen={show}
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
                  // padding: '30px 30px',
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
              Close position
            </Block>

            {/* Confirm amount for trade */}
            <Block paddingTop={['30px', '40px', '0']}>
              {/* Confirm  amount */}
              <Title>{`You're about to close position on ${'100'} of STQ`}</Title>

              {/* Confirm */}
              <p style={{ display: 'flex' }}>
                <Button
                  size="default"
                  onClick={() => cancelTheOrderApi()}
                  overrides={{
                    BaseButton: {
                      style: ({ $theme }) => {
                        return {
                          width: '50%',
                          ...$theme.typography.font250,
                        };
                      },
                    },
                  }}
                > Continue </Button>

                <div style={{ width: '10px' }} />

                <Button
                  kind="secondary"
                  size="default"
                  onClick={() => hide()}
                  overrides={{
                    BaseButton: {
                      style: ({ $theme }) => {
                        return {
                          width: '50%',
                          ...$theme.typography.font250,
                        };
                      },
                    },
                  }}
                > Cancel </Button>
              </p>
            </Block>

          </Block>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CancelOrder;

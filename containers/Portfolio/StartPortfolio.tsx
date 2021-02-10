import React, { useState } from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { Block } from 'baseui/block';
import { Modal, ModalBody } from 'baseui/modal';
import { useApolloClient } from '@apollo/client';

import { Grid, Cell } from 'baseui/layout-grid';
import { MarketDataType } from '@stoqey/client-graphql';
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
  hide: () => void
};


const StartPortfolio = (props: Props) => {
  const { show, hide } = props;
  const [amount, setAmount] = useState(3);

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
              BUY/SELL STQ
            </Block>

            {/* Form */}
            <Block paddingTop={['30px', '40px', '0']}>
              <Title>Amount Details</Title>
              <Input
                type={"number"}
                onChange={(e: any) => setAmount(e.target.value)}
                placeholder="Enter amount"
                overrides={{
                  InputContainer: {
                    style: () => {
                      return { backgroundColor: 'transparent' };
                    },
                  },
                }}
              />
              <PriceList>
                <PriceItem>
                  <span>Per share</span> <span>$ XXXX</span>
                </PriceItem>
                <PriceItem>
                  <span>Total</span> <span> + 0.5%</span>
                </PriceItem>
              </PriceList>
              <Button
                size="large"
                onClick={() => { }}
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => {
                      return {
                        width: '100%',
                        ...$theme.typography.font250,
                      };
                    },
                  },
                }}
              >
                Next
										</Button>
            </Block>


            {/* Confirm amount for trade */}
            <Block paddingTop={['30px', '40px', '0']}>

              {/* Confirm  amount */}
              <Title>{`You're about to BUY ${'100'} of STQ`}</Title>

              {/* Confirm */}
              <p style={{ display: 'flex' }}>
                <Button
                  size="default"
                  onClick={() => { }}
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
                > Process </Button>

                <div style={{ width: '10px' }} />

                <Button
                  size="default"
                  onClick={() => { }}
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

export default StartPortfolio;

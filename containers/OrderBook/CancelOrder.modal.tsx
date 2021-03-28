import React, { useState } from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { Block } from 'baseui/block';
import { Modal, ModalBody } from 'baseui/modal';
import { useApolloClient } from '@apollo/client';
import { toaster, ToasterContainer } from "baseui/toast";
import { Grid, Cell } from 'baseui/layout-grid';
import { MarketDataType, OrderType, PortfolioType } from '@stoqey/client-graphql';
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
import { MdWarning } from 'react-icons/md';
import { H5, H6, Paragraph2, Paragraph4 } from 'baseui/typography';

interface Props {
  show: boolean;
  hide?: () => void;
  order: OrderType;
  onError?: (message: string) => void;
  onSuccess?: (message: string) => void;
};


const CancelOrder = (props: Props) => {
  const { show, hide, order, onError, onSuccess } = props;

  const qty = order && order.qty;
  const remainingQty = (qty || 0) - (order && order.filledQty || 0);

  const client = useApolloClient();

  const cancelTheOrderApi = async () => {

    toaster.info(
      <>
        Some message
      </>,
      {
        onClose: () => console.log("Toast closed."),
        overrides: {
          InnerContainer: {
            style: { width: "100%" }
          }
        }
      }
    );

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
            <MdWarning
              size="4em"
              color="red"
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
              Cancel order
            </Block>

            {/* Confirm amount for trade */}
            <Block paddingTop={['30px', '40px', '0']}>
              {/* Confirm  amount */}
              <H6>{`You're about to cancel a STQ order of ${qty} shares`}</H6>
              <Paragraph2>{`the remaining ${remainingQty} unsold shares will not be affected`}</Paragraph2>

              {/* Confirm */}
              <p style={{ display: 'flex', padding: "20px" }}>
                <Button
                  isLoading={true}
                  shape="pill"
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
                > ✅ Submit </Button>

                <div style={{ width: '10px' }} />

                <Button
                  shape="pill"
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
                > ❌ Dismiss </Button>
              </p>
            </Block>

          </Block>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CancelOrder;

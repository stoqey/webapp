import React, { useState } from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { Block } from 'baseui/block';
import { Modal, ModalBody } from 'baseui/modal';
import { useApolloClient } from '@apollo/client';

import { Grid, Cell } from 'baseui/layout-grid';
import { ActionType, MarketDataType, IOrderType } from '@stoqey/client-graphql';
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

import { startPortfolioMutation } from './portfolios.api'

interface Props {
  show: boolean;
  hide: () => void;
  onError?: (message: string) => void;
  onSuccess?: (message: string) => void;
};


interface State {
  steps: number;
  action: ActionType;
  type: IOrderType;
  price: number;
  qty: number;
}
const StartPortfolio = (props: Props) => {
  const client = useApolloClient();
  const { show, hide, onError, onSuccess } = props;
  const [steps, setSteps] = useState(0);
  const [amount, setAmount] = useState(0);

  const [state, setState] = useState<State>({
    steps: 1,
    type: IOrderType.MARKET,
    action: ActionType.BUY,
    price: 3,
    qty: 1,
  });

  const handleState = (field: string) => {
    return (value) => {
      setState({
        ...state,
        [field]: value,
      });
    }
  }

  const startPortfolio = async () => {
    // TODO substract from price
    const size = +amount;
    await startPortfolioMutation({
      client,
      args: {
        action: ActionType.BUY,
        size
      },
      success: async (d: any) => {
        console.log('success starting portfolio', d);
        onSuccess(`Successfully started portfolio for ${size} shares`)
        hide();
      },
      error: async (e: Error) => {
        onError(e && e.message)
      },
    })
  }

  const { type, action, price, qty } = state;

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
            {steps === 0 && (
              <Block paddingTop={['30px', '40px', '0']}>

                {/* Buy / Sell */}
                <Button
                  kind={action !== "BUY" ? "secondary" : "primary"}
                  size="mini"
                  onClick={() => handleState("action")("BUY")}
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
                > BUY </Button>
                <Button
                  kind={action !== "SELL" ? "secondary" : "primary"}
                  size="mini"
                  onClick={() => handleState("action")("SELL")}
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
                > SELL </Button>
                <Title>Action</Title>


                {/* Type Market/Limit */}
                <Button
                  kind={type !== "market" ? "secondary" : "primary"}
                  size="mini"
                  onClick={() => handleState("type")("market")}
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
                > Market </Button>
                <Button
                  kind={type !== "limit" ? "secondary" : "primary"}
                  size="mini"
                  onClick={() => handleState("type")("limit")}
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
                > Limit </Button>
                <Title>Type</Title>


                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Input
                    value={price}
                    type={"number"}
                    onChange={(e: any) => handleState("price")(e.target.value)}
                    placeholder="Price"
                    overrides={{
                      Root: {
                        style: () => {
                          return { flex: 0.6 };
                        },
                      },

                      InputContainer: {
                        style: () => {
                          return { backgroundColor: 'transparent' };
                        },
                      },
                    }}
                  />
                  <Input
                    value={qty}
                    type={"number"}
                    onChange={(e: any) => handleState("qty")(e.target.value)}
                    placeholder="Qty"
                    overrides={{
                      Root: {
                        style: () => {
                          return { flex: 0.3 };
                        },
                      },
                      InputContainer: {
                        style: () => {
                          return { backgroundColor: 'transparent' };
                        },
                      },
                    }}
                  />
                </div>


                <PriceList>
                  <PriceItem>
                    <span>Market Price</span> <span>$ XXXX</span>
                  </PriceItem>
                  <PriceItem>
                    <span>Total amount</span> <span> 1.2 </span>
                  </PriceItem>
                </PriceList>
                <Button
                  size="large"
                  onClick={() => setSteps(1)}
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
                > Next </Button>
              </Block>
            )}

            {/* Confirm amount for trade */}
            {steps === 1 && (
              <Block paddingTop={['30px', '40px', '0']}>
                {/* Confirm  amount */}
                <Title>{`You're about to BUY ${amount} of STQ`}</Title>

                {/* Confirm */}
                <p style={{ display: 'flex' }}>
                  <Button
                    size="default"
                    onClick={() => startPortfolio()}
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
                    onClick={() => setSteps(0)}
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
            )}

          </Block>
        </ModalBody>
      </Modal>
    </>
  );
};

export default StartPortfolio;

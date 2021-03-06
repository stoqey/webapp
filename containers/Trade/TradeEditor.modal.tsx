import React, { useState } from 'react';
import sum from 'lodash/sum';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { BsFillTriangleFill } from 'react-icons/bs';
import { Block } from 'baseui/block';
import { Modal, ModalBody } from 'baseui/modal';
import { useApolloClient } from '@apollo/client';
import { Grid, Cell } from 'baseui/layout-grid';
import { ActionType, MarketDataType, IOrderType, PortfolioType } from '@stoqey/client-graphql';
import { Button } from 'baseui/button';
import { Input } from 'baseui/input';
import {
  Title,
  PriceList,
  PriceItem,
} from 'components/PageStyles/Checkout.styled';

import { createOrderMutation } from '../OrderBook/order.api'
import { niceDec } from 'utils/number';
import OrderBookContainer from 'containers/OrderBook';
import { ButtonGroup } from 'baseui/button-group';
import { H3, H4, Paragraph3 } from 'baseui/typography';
import { getTradeColor } from 'utils/colors';
import CurrencyPill from '@/components/Currency';
import { useUserInfo } from 'hooks/useUserInfo';
import { Popover } from 'baseui/popover';


import { DesktopOrderBookWrapper, MobileOrderBookWrapper } from "./styles";
import { SpaceBetween } from '@/components/PageStyles/Settings.styled';
interface Props {
  quote: MarketDataType;
  show: boolean;
  hide: () => void;
  onError?: (message: string) => void;
  onSuccess?: (Results: Results) => void;
  state?: TradeEditorState;
  portfolios?: PortfolioType[]
};


export interface TradeEditorState {
  steps: number;
  action: ActionType;
  type: IOrderType;
  price: number;
  qty: number;
  stopPrice?: number;
  // admin?: boolean;
}

interface Results extends TradeEditorState {
  message: string;
  success: boolean;
};

const TradeEditor = (props: Props) => {
  const client = useApolloClient();
  const { show, hide, onError, onSuccess, quote, state: propsState, portfolios = [] } = props;


  const close = quote && quote.close;
  const [state, setState] = useState<TradeEditorState>({
    steps: 0,
    type: IOrderType.LIMIT,
    action: ActionType.BUY,
    price: close,
    qty: 1,
    ...propsState,
  });

  const { user } = useUserInfo();

  const { type, action, price = close, qty, stopPrice, steps } = state;

  const handleChange = (field: string) => {
    return (value) => {
      setState({
        ...state,
        [field]: value,
      });
    }
  }

  const startPortfolio = async () => {
    await createOrderMutation({
      client,
      args: {
        action,// : ActionType.BUY,
        size: Math.abs(qty),
        type,
        price: Math.abs(type === "market" ? close : price),
        stopPrice: Math.abs(stopPrice),
      },
      success: async (d: any) => {
        console.log('success starting portfolio', d);
        const success: Results = {
          message: `Successfully submitted order shares:${qty} `,
          success: true,
          ...state,
        }
        onSuccess(success);
      },
      error: async (e: Error) => {
        onError(e && e.message)
      },
    })
  }



  const finalPrice = niceDec(type === "limit" ? qty * price : qty * close);

  const getColor = (sell: boolean = false) => getTradeColor(sell ? -1 : 1);

  const maxmumQty = Math.round((user && user.balance) / (type === IOrderType.LIMIT ? price : close));

  const availableQty = sum(portfolios.map(t => t.size));

  // Amount or QTY
  const balance = action === ActionType.SELL ? availableQty - qty : (user && user.balance) - +finalPrice;

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

        {/* Desktop OrderBook */}
        <Popover
          isOpen
          content={<p></p>}
        >
          <DesktopOrderBookWrapper>
            <OrderBookContainer showCurrency />
          </DesktopOrderBookWrapper>
        </Popover>

        <ModalBody style={{ overflow: 'hidden' }}>


          <Block paddingTop={['0', '0', '0', '40px']}>
            <Grid gridColumns={12} gridGutters={0} gridMargins={0}>

              <Cell span={[12, 12, 12]}>
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

                  <SpaceBetween>
                    <div>
                      {/* TRADE SIGN */}
                      {action === ActionType.BUY ? (
                        <BsFillTriangleFill
                          // size="4em"
                          color={getColor()}
                          style={{ marginBottom: '10px' }}
                        />
                      ) : (
                        <BsFillTriangleFill
                          // size="4em"
                          color={getColor(true)}
                          style={{ marginBottom: '10px', transform: 'rotate(180deg)' }}
                        />
                      )}
                      <Block
                        as="p"
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
                                display: "flex",
                                justifyContent: "center",

                                alignItems: "center"
                              };
                            },
                          },
                        }}
                      >
                        <strong style={{ color: getColor(action === ActionType.SELL) }}>{action}</strong> STQ™
                    </Block>
                    </div>

                    <div style={{ width: "40px" }} />


                    <div style={{ textAlign: "center" }}>
                      {/* Available balance and QTy */}
                      <CurrencyPill amount={balance} name={action === ActionType.SELL ? 'Shares left' : 'Balance left'} />
                    </div>

                  </SpaceBetween>


                  <div style={{ display: "flex", justifyContent: "center", alignContent: "center", alignItems: 'center', textAlign: 'center' }}>



                  </div>



                  {/* Form */}
                  <Block paddingTop={['30px', '40px', '0']}>

                    {/* Buy / Sell */}
                    <div style={{ padding: '10px', marginBottom: '20px' }}>
                      <Button
                        kind={action !== "BUY" ? "secondary" : "primary"}
                        size="mini"
                        shape="pill"
                        onClick={() => handleChange("action")("BUY")}
                        overrides={{
                          BaseButton: {
                            style: ({ $theme }) => {
                              return {
                                width: '50%',
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                backgroundColor: '#3AA76D',
                                color: 'white',
                                opacity: action === "BUY" ? 1 : 0.2,

                                ":hover": {
                                  backgroundColor: '#3AA76D',
                                  opacity: 1,
                                },
                                ...$theme.typography.font650,
                              };
                            },
                          },
                        }}
                      > BUY</Button>
                      <Button
                        size="mini"
                        shape="pill"
                        onClick={() => handleChange("action")("SELL")}
                        overrides={{
                          BaseButton: {
                            style: ({ $theme }) => {
                              return {
                                width: '50%',
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                backgroundColor: 'rgba(216, 33, 33)',
                                color: 'white',
                                ":hover": {
                                  backgroundColor: 'rgba(216, 33, 33)',
                                  opacity: 1,
                                },
                                opacity: action === "SELL" ? 1 : 0.2,
                                ...$theme.typography.font650,
                              };
                            },
                          },
                        }}
                      > SELL </Button>
                    </div>


                    {/* Type Market/Limit */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {/* <div style={{ flex: 0.1 }}></div> */}
                      <div style={{ flex: 0.5 }}>
                        <div style={{ display: "flex", width: "100%" }}>
                          <Button $style={{ flex: 0 }} size="compact" kind={"tertiary"} onClick={() => { }}>Price</Button>
                          <Button $style={{ flex: 1 }} size="compact" kind={type === "market" ? "primary" : "secondary"} onClick={() => handleChange("type")("market")}>Market</Button>
                          <Button $style={{ flex: 1 }} size="compact" kind={type === "limit" ? "primary" : "secondary"} onClick={() => handleChange("type")("limit")}>Limit</Button>
                        </div>
                        <Input
                          startEnhancer="$"
                          disabled={type === "market"}
                          value={type === "market" ? close : price}
                          type={"number"}
                          onChange={(e: any) => handleChange("price")(e.target.value)}
                          placeholder="Price"
                          overrides={{
                            Root: {
                              style: () => {
                                return { flex: 0.5 };
                              },
                            },

                            InputContainer: {
                              style: () => {
                                return { backgroundColor: 'transparent' };
                              },
                            },

                            Input: {
                              style: () => {
                                return { fontSize: '1.5em' };
                              },
                            },
                          }}
                        />
                      </div>

                      <div style={{ flex: 0.02 }}></div>

                      <div style={{ flex: 0.5, background: 'red', alignSelf: 'center' }}>
                        <Input
                          value={qty}
                          startEnhancer="Shares"
                          min={1}
                          max={maxmumQty}
                          type={"number"}
                          onChange={(e: any) => handleChange("qty")(e.target.value)}
                          placeholder="Shares"
                          overrides={{
                            InputContainer: {
                              style: () => {
                                return { backgroundColor: 'transparent' };
                              },
                            },
                            Input: {
                              style: () => {
                                return { fontSize: '2.7em' };
                              },
                            }
                          }}
                        />
                      </div>

                      {/* <div style={{ flex: 0.1 }}></div> */}
                    </div>


                    {/* Price list */}
                    <PriceList>
                      <PriceItem>
                        <span>Market Price</span> <span>{niceDec(close)}</span>
                      </PriceItem>

                      {/* Limit price */}

                      <PriceItem>
                        <span>Limit Price</span> <span>{type === "limit" ? niceDec(+price) : null}</span>
                      </PriceItem>


                      <PriceItem>
                        <span><strong> Total amount</strong></span> <span> <strong>{finalPrice}</strong></span>
                      </PriceItem>
                    </PriceList>

                    {/* Next button */}


                    {/* Confirm amount for trade */}

                    <Block paddingTop={['30px', '40px', '0']}>
                      {/* Confirm  amount */}
                      {/* <H4>
                        {`You're about to `} <strong>{action}</strong> {` ${qty} shares of STQ`}
                      </H4> */}
                      {/* Confirm */}
                      <p style={{ display: 'flex', padding: '10px', flexDirection: 'row', justifyContent: "center" }}>
                        <Button
                          disabled={+finalPrice <= 0 || balance < 0}
                          size="default"
                          shape="pill"
                          onClick={() => startPortfolio()}
                          overrides={{
                            BaseButton: {
                              style: ({ $theme }) => {
                                return {
                                  width: '50%',
                                  ...$theme.typography.font450,
                                };
                              },
                            },
                          }}
                        > {+finalPrice <= 0 || balance < 0 ? "❌" : "✅"} Submit Order </Button>
                      </p>
                    </Block>

                  </Block>




                  <MobileOrderBookWrapper>
                    <OrderBookContainer showCurrency={false} />
                  </MobileOrderBookWrapper>

                </Block>
              </Cell>



            </Grid>
          </Block>


        </ModalBody>
      </Modal>
    </>
  );
};

export default TradeEditor;

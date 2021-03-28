import React from 'react';
import { Block } from 'baseui/block';
import { Toast, KIND, toaster } from 'baseui/toast';
import { Modal, ModalBody } from 'baseui/modal';
import { useApolloClient } from '@apollo/client';
import { OrderType } from '@stoqey/client-graphql';
import { Button } from 'baseui/button';
import { MdWarning } from 'react-icons/md';
import { H6, Paragraph2 } from 'baseui/typography';
import { cancelOrderMutation } from './order.api';
import Toaster from '@/components/UiElements/Toaster/Toaster';

interface Props {
  show: boolean;
  hide?: () => void;
  order: OrderType;
  onError?: (message: string) => void;
  onSuccess?: (message: string) => void;
};


const CancelOrder = (props: Props) => {
  const { show, hide, order } = props;

  const orderId = order && order.id;
  const qty = order && order.qty;
  const remainingQty = (qty || 0) - (order && order.filledQty || 0);

  const client = useApolloClient();

  let toastKey = null;

  const onSuccess = (message: string) => {
    toastKey = toaster.positive(<>{message}</>, {
      autoHideDuration: 4000
    })
  }

  const onError = (message: string) => {
    toastKey = toaster.negative(<>{message}</>, {
      autoHideDuration: 5000
    })
  }

  const cancelTheOrderApi = async () => {
    await cancelOrderMutation({
      client,
      args: { id: orderId },
      success: async (d: any) => {
        onSuccess(`Successfully submitted order to cancel`);
        setTimeout(() => hide(), 4000);
      },
      error: async (e: Error) => {
        onError(e && e.message)
      },
    })
  }

  return (
    <>
      <Toaster toastKey={toastKey} />
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
                  // isLoading={true}
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

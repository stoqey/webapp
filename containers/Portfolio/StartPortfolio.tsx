import React, { useState } from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { Block } from 'baseui/block';
import { Modal, ModalBody } from 'baseui/modal';
import { useApolloClient } from '@apollo/client';

interface Props {
  show: boolean;
  hide: () => void
};


const StartPortfolio = (props: Props) => {
  const {  show, hide } = props;

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
    </>
  );
};

export default StartPortfolio;

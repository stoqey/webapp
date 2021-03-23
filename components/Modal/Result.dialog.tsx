import React, { useState } from 'react';
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from 'react-icons/io';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import { Modal, ModalBody } from 'baseui/modal';
import { getTradeColor } from 'utils/colors';
import { isEmpty } from 'lodash';

interface Content {
  title: string;
  value: any;
}
interface Props {
  show: boolean;
  hide: Function;
  success: boolean;
  title: string;
  content?: Content[];
};

const ResultsDialog = (props: Props) => {
  const { show, hide, success, title, content = [] } = props;


  return (
    <Block marginLeft="-16px" marginRight="-16px">

      {/* Success model */}
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
            {/* Icon */}
            {success ? (
              <IoIosCheckmarkCircleOutline
                size="4em"
                color={getTradeColor(1)}
                // color="#3AA76D"
                style={{ marginBottom: '20px' }}
              />
            ) : (
              <IoIosCloseCircleOutline
                size="4em"
                color={getTradeColor(-1)}
                style={{ marginBottom: '20px' }}
              />
            )}


            {/* Title */}
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
              {title}
            </Block>

            {!isEmpty(content) && content.map((i) => {
              return ( <Block as="p" marginBottom="15px" key={i.title}>
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
                    {i.title} :{' '}
                  </Block>
                  <Block as="span">{i.value}</Block>
                </Block>
              )
            })}

          </Block>
        </ModalBody>
      </Modal>

    </Block>
  );
};

export default ResultsDialog;

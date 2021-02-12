import React from 'react';
import { toaster, ToasterContainer, PLACEMENT } from 'baseui/toast';

interface Props {
  toastKey: any;
  placement?: PLACEMENT[keyof PLACEMENT]
};

const Toaster = ({ toastKey, placement = "top" }: Props) => {
  return (
    <ToasterContainer
      placement={placement}
      overrides={{
        Root: {
          style: () => {
            return {
              zIndex: 9999,
            };
          },
        },
        // ToastBody: {
        //   style: ({ $theme }) => {
        //     return {
        //       backgroundColor: $theme.colors.primaryA,
        //       color: $theme.colors.primary
        //     };
        //   },
        // },
      }}
    >
      {toastKey}
    </ToasterContainer>
  );
};

export default Toaster;

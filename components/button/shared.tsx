import React from 'react';
import { Button as DefaultButton, ButtonProps } from 'baseui/button'
import { Amplitude } from '@amplitude/react-amplitude';

interface Analytics {
  eventName?: string;
};

type ButtonType = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<ButtonProps> & React.RefAttributes<HTMLButtonElement>
> & Analytics;

export const Button = (props: ButtonType) => {
  const eventName = (props && props.eventName) || 'click';

  if (process.browser) {
    return (
      <Amplitude
        eventProperties={(inheritedProps) => ({
          ...inheritedProps,
          scope: 'website',
          eventName,
        })}
      >
        {({ logEvent }) => (
          <DefaultButton
            {...props}
            // href="#"
            onClick={() => {
              logEvent(eventName);
            }}
          />
        )}
      </Amplitude>
    );
  }

  // @ts-ignore
  return <DefaultButton {...props} />;
};

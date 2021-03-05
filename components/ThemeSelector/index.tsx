import * as React from 'react';
import {Button} from 'baseui/button';
import {ChevronDown} from 'baseui/icon';
import {StatefulPopover, PLACEMENT} from 'baseui/popover';
import {StatefulMenu} from 'baseui/menu';
const ITEMS = [
  {label: 'Light'},
  {label: 'Dark'},
];
export default function Example() {
  return (
    <StatefulPopover
      focusLock
      placement={PLACEMENT.bottomLeft}
      content={({close}) => (
        <StatefulMenu
          items={ITEMS}
          onItemSelect={() => close()}
          overrides={{
            List: {style: {height: '150px', width: '138px'}},
          }}
        />
      )}
    >
      <Button endEnhancer={() => <ChevronDown size={24} />}>
        Theme
      </Button>
    </StatefulPopover>
  );
}
import React from 'react';
import styled, { css } from 'styled-components';
import {
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
} from 'styled-system';

const BoxWrapper = styled('div')(
  (props) =>
    props.flexBox &&
    css(
      { display: 'flex' },
      flexWrap,
      flexDirection,
      alignItems,
      justifyContent,
  
    )
);

const Box = ({ children, ...props }) => (
  <BoxWrapper {...props}>{children}</BoxWrapper>
);

export default Box;
import React from 'react';
import styled from 'styled-components';
import {
  fontFamily,
  fontWeight,
  textAlign,
  lineHeight,
  letterSpacing,
} from 'styled-system';

const TextWrapper = styled('p')(
  fontFamily,
  fontWeight,
  textAlign,
  lineHeight,
  letterSpacing,
);

const Text = ({ content, ...props }) => (
  <TextWrapper {...props}>{content}</TextWrapper>
);

export default Text;

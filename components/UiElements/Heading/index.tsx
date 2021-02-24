import React from 'react';
import styled from 'styled-components';
import {
  fontFamily,
  fontWeight,
  textAlign,
  lineHeight,
  letterSpacing,
} from 'styled-system';

interface Props {
  content: string,
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  mt?: string | number;
  mb?: any;
  fontFamily?: any;
  fontWeight?: any;
  textAlign?: any;
  lineHeight?: any;
  letterSpacing?: any;
};

const initProps = {
  as: 'h2',
  mt: 0,
  mb: '1rem',
  fontWeight: 'bold',
};

const HeadingWrapper = styled('p')(
  fontFamily,
  fontWeight,
  textAlign,
  lineHeight,
  letterSpacing
);

const Heading = ({ content, ...props }: Props) => (
  <HeadingWrapper {...initProps} {...props}> { content }</HeadingWrapper >
);

export default Heading;


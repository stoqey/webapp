import React from 'react';
import Container from '../Container/Container';
import Section, { Title, Subtitle, Backdrop } from './PageTitle.styled';

type PageTitleProps = {
  title: string | undefined;
  subtitle?: string;
  backdrop?: boolean;
  bgColor?: string;
  style?: any;
};

const PageTitle = ({ title, subtitle, backdrop, bgColor, style }: PageTitleProps) => {
  return (
    <Section style={{ backgroundColor: bgColor, ...style }}>
      <Container>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Container>
      {backdrop && <Backdrop></Backdrop>}
    </Section>
  );
};

PageTitle.defaultProps = {
  backdrop: true,
};

export default PageTitle;

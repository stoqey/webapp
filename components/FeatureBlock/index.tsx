import React, { Fragment } from 'react';
import FeatureBlockWrapper, {
  IconWrapper,
  ContentWrapper,
  ButtonWrapper,
} from './featureBlock.style';

interface Props {
  /** ClassName of the FeatureBlock */
  className: string;

  /** title prop contain a react component. You can use our Heading component from reusecore */
  title: any;

  /** description prop contain a react component. You can use our Text component from reusecore */
  description: any;

  /** button prop contain a react component. You can use our Button component from reusecore */
  button: any;

  /** Set icon position of the FeatureBlock */
  iconPosition: 'top' | 'left' | 'right';

  /** wrapperStyle prop contain these style system props:  display, flexWrap, width, height, alignItems,
   * justifyContent, position, overflow, space, color, borders, borderColor, boxShadow and borderRadius. */
  wrapperStyle: any;

  /** iconStyle prop contain these style system props: display, width, height, alignItems, justifyContent,
   * position, space, fontSize, color, borders, overflow, borderColor, boxShadow and borderRadius. */
  iconStyle: any;

  /** contentStyle prop contain these style system props: width, textAlign and space. */
  contentStyle: any;

  /** btnWrapperStyle prop contain these style system props: display, space, alignItems,
   * flexDirection and justifyContent. */
  btnWrapperStyle: any;

  additionalContent: any;

  icon: any;
};

const FeatureBlock = ({
  className,
  icon,
  title,
  button,
  description,
  iconPosition,
  additionalContent,
  wrapperStyle,
  iconStyle,
  contentStyle,
  btnWrapperStyle,
  ...props
}: Props) => {
  // Add all classs to an array
  const addAllClasses = ['feature__block'];

  // Add icon position class
  if (iconPosition) {
    addAllClasses.push(`icon_${iconPosition}`);
  }

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  // check icon value and add
  const Icon = icon && (
    <IconWrapper className="icon__wrapper" {...iconStyle}>
      {icon}
    </IconWrapper>
  );

  return (
    <FeatureBlockWrapper
      className={addAllClasses.join(' ')}
      {...wrapperStyle}
      {...props}
    >
      {Icon}

      {title || description || button ? (
        <Fragment>
          <ContentWrapper className="content__wrapper" {...contentStyle}>
            {title}
            {description}
            {button && (
              <ButtonWrapper className="button__wrapper" {...btnWrapperStyle}>
                {button}
              </ButtonWrapper>
            )}
          </ContentWrapper>
          {additionalContent}
        </Fragment>
      ) : (
        ''
      )}
    </FeatureBlockWrapper>
  );
};

FeatureBlock.defaultProps = {
  iconPosition: 'top',
};

export default FeatureBlock;

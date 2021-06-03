import React, { useContext, useEffect, useRef, useState } from 'react';
import { css, styled } from '@storybook/theming';
import { Icons } from '../icon/icon';
import { AccordionItemContext } from './AccordionItemContext';

export type AccordionHeaderProps = {
  open?: boolean;
  label?: string;
  Icon?: React.ReactNode;
  LabelProps?: React.HTMLAttributes<HTMLDivElement>;
} & React.HTMLAttributes<HTMLButtonElement>;

export const AccordionHeader = ({
  label,
  open: _open = false,
  children,
  Icon,
  LabelProps: _LabelProps = {},
  ...rest
}: AccordionHeaderProps) => {
  const [open, setOpen] = useState(_open);
  const context = useContext(AccordionItemContext);
  const id = useRef('');

  const handleOnClick = () => {
    if (context !== null) {
      if (open) {
        context.onClose();
      } else {
        context.onOpen();
      }
    } else {
      setOpen(!open);
    }
  };

  useEffect(() => {
    if (_open !== open) {
      setOpen(_open);
    }
  }, [_open]);

  useEffect(() => {
    if (context !== null) {
      if (context.open !== open) {
        setOpen(context.open);
      }

      id.current = `${context.id}-label`;
    }
  }, [context, setOpen]);

  // If custom DOM is provided in the header, then we can no longer automate
  // aria-labelledby="" for the <AccordionItem /> and user has to provide both the
  // id for the label and add aria-labelledby on <AccordionItem /> to match
  const LabelProps: React.HTMLAttributes<HTMLDivElement> = { ..._LabelProps };

  if (id.current) {
    LabelProps.id = id.current;
  }

  return (
    <Wrapper data-sb-accordion-header="" onClick={handleOnClick} {...rest}>
      <Expander data-sb-accordion-expander="" isOpen={open}>
        {Icon !== undefined ? (
          Icon
        ) : (
          <Chevron role="img" aria-label="expander" icon="chevrondown" />
        )}
      </Expander>
      <Label data-sb-accordion-label="" {...LabelProps}>
        {label || children}
      </Label>
    </Wrapper>
  );
};

const Wrapper = styled.button({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '0',
  margin: '0',
  border: '0 none',
  textAlign: 'left',
  backgroundColor: 'transparent',
});

type ExpanderProps = {
  isOpen: boolean;
};

const Expander = styled.div<ExpanderProps>(({ theme, isOpen }) => ({
  color: theme.color.mediumdark,
  width: '10px',
  minWidth: '10px',
  minHeight: '10px',
  maxWidth: '10px',
  maxHeight: '10px',
  height: '10px',
  marginRight: '16px',
  marginTop: '5px',
  transform: `rotate(${isOpen ? 90 : 0}deg)`,
  transition: 'transform 0.1s ease-in-out',
  alignSelf: 'flex-start',
}));

const Chevron = styled(Icons)({
  transform: 'rotate(-90deg)',
});

const Label = styled.div(({ theme }) => ({
  color: theme.color.defaultText,
  width: '100%',
}));

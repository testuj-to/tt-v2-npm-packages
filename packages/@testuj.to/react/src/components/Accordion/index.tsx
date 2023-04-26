import React from "react";
import cx from "classnames";
import * as RadixAccordion from "@radix-ui/react-accordion";

import "./styles.css";

export interface AccordionProps {
  items: AccordionItemProps[];
  rootProps?: RadixAccordion.AccordionMultipleProps;
}

export interface AccordionItemProps {
  title: React.ReactNode;
  content: React.ReactNode;
  value?: string;
}

export interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export const Accordion = ({ items, rootProps }: AccordionProps) => {
  return (
    <RadixAccordion.Root className="tt-accordion-root" {...rootProps}>
      {items.map((item) => (
        <AccordionItem {...item} />
      ))}
    </RadixAccordion.Root>
  );
};

export const AccordionItem = ({ title, content, value }: AccordionItemProps) => {
  return (
    <RadixAccordion.Item className="tt-accordion-item" value={value}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>{content}</AccordionContent>
    </RadixAccordion.Item>
  );
};

const AccordionTrigger = React.forwardRef(
  (
    { children, className, ...props }: AccordionTriggerProps,
    forwardedRef: React.ForwardedRef<HTMLButtonElement>
  ) => (
    <RadixAccordion.Header className="tt-accordion-header">
      <RadixAccordion.Trigger
        className={cx("tt-accordion-trigger", className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
        {/* <ChevronDownIcon className="AccordionChevron" aria-hidden /> */}
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  )
);

const AccordionContent = React.forwardRef(
  (
    { children, className, ...props }: AccordionContentProps,
    forwardedRef: React.ForwardedRef<HTMLDivElement>
  ) => (
    <RadixAccordion.Content
      className={cx("tt-accordion-content", className)}
      {...props}
      ref={forwardedRef}
    >
      <div className="tt-accordion-inner-content">{children}</div>
    </RadixAccordion.Content>
  )
);

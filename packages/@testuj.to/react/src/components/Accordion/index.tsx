import React from "react";
import cx from "classnames";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import "./styles.css";

export type AccordionVariant = "outlined" | "filled";
export interface AccordionProps {
    items: AccordionItemProps[];
    rootProps?: RadixAccordion.AccordionMultipleProps;
    variant?: AccordionVariant;
}

export interface AccordionItemProps {
    title: React.ReactNode;
    content: React.ReactNode;
    value?: string;
    variant?: AccordionVariant;
}

export interface AccordionTriggerProps {
    children: React.ReactNode;
    className?: string;
}

export interface AccordionContentProps {
    children: React.ReactNode;
    className?: string;
}

export const Accordion = ({ items, rootProps, variant }: AccordionProps) => {
    return (
        <RadixAccordion.Root className="tt-accordion-root" {...rootProps}>
            {items.map((item, index) => (
                <AccordionItem {...item} key={index} variant={variant} />
            ))}
        </RadixAccordion.Root>
    );
};

export const AccordionItem = ({ title, content, value, variant }: AccordionItemProps) => {
    return (
        <RadixAccordion.Item className={cx("tt-accordion-item", variant)} value={value}>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>{content}</AccordionContent>
        </RadixAccordion.Item>
    );
};

const AccordionTrigger = React.forwardRef(({ children, className, ...props }: AccordionTriggerProps, forwardedRef: React.ForwardedRef<HTMLButtonElement>) => {
    return (
        <RadixAccordion.Header className="tt-accordion-header">
            <RadixAccordion.Trigger
                {...props}
                ref={forwardedRef}
                className={cx("tt-accordion-trigger", className)}
            >
                {children}
                <ChevronDownIcon className="tt-accordion-chevron" aria-hidden />
            </RadixAccordion.Trigger>
        </RadixAccordion.Header>
    );
});

const AccordionContent = React.forwardRef(({ children, className, ...props }: AccordionContentProps, forwardedRef: React.ForwardedRef<HTMLDivElement>) => {
    return (
        <RadixAccordion.Content
            {...props}
            ref={forwardedRef}
            className={cx("tt-accordion-content", className)}
        >
            <div className="tt-accordion-inner-content">
                {children}
            </div>
        </RadixAccordion.Content>
    );
});

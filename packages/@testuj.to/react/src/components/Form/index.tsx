import * as RadixForm from "@radix-ui/react-form";
import cx from "classnames";

import "./styles.css";

export interface FormProps extends RadixForm.FormProps {
  children: React.ReactNode;
}

export const Form = ({ children, ...rest }: FormProps) => {
  return <RadixForm.Root {...rest}>{children}</RadixForm.Root>;
};

Form.Field = RadixForm.Field;

Form.Label = ({ children, className, ...rest }: RadixForm.LabelProps) => (
  <RadixForm.Label {...rest} className={cx("tt-form-label", className)}>
    {children}
  </RadixForm.Label>
);

Form.Message = RadixForm.Message;
Form.Submit = RadixForm.Submit;
Form.ValidityState = RadixForm.ValidityState;
Form.Control = RadixForm.Control;

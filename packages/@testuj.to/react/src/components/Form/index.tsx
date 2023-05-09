import * as RadixForm from "@radix-ui/react-form";

import "./styles.css";

export interface FormProps extends RadixForm.FormProps {
  children: React.ReactNode;
}

export const Form = ({ children, ...rest }: FormProps) => {
  return <RadixForm.Root {...rest}>{children}</RadixForm.Root>;
};

Form.Field = RadixForm.Field;
Form.Label = RadixForm.Label;
Form.Message = RadixForm.Message;
Form.Submit = RadixForm.Submit;
Form.ValidityState = RadixForm.ValidityState;
Form.Control = RadixForm.Control;

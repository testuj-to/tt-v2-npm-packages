import * as Dialog from "@radix-ui/react-dialog";
// import { Cross2Icon } from "@radix-ui/react-icons";

import "./styles.css";

export interface ModalProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export const Modal = ({ children, content }: ModalProps) => {
  return <Dialog.Root>{children}</Dialog.Root>;
};

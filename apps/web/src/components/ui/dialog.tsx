import {
  Dialog as ChakraDialog,
  ConditionalValue,
  DialogOpenChangeDetails,
  Portal,
} from "@chakra-ui/react";
import * as React from "react";

import { CloseButton } from "./close-button";

interface DialogContentProps extends ChakraDialog.ContentProps {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  backdrop?: boolean;
}

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(function DialogContent(props, ref) {
  const {
    children,
    portalled = true,
    portalRef,
    backdrop = true,
    ...rest
  } = props;

  return (
    <Portal disabled={!portalled} container={portalRef}>
      {backdrop && <ChakraDialog.Backdrop />}
      <ChakraDialog.Positioner>
        <ChakraDialog.Content ref={ref} {...rest} asChild={false}>
          {children}
        </ChakraDialog.Content>
      </ChakraDialog.Positioner>
    </Portal>
  );
});

export const DialogCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraDialog.CloseTriggerProps
>(function DialogCloseTrigger(props, ref) {
  return (
    <ChakraDialog.CloseTrigger
      position="absolute"
      top="2"
      insetEnd="2"
      {...props}
      asChild
    >
      <CloseButton size="sm" ref={ref}>
        {props.children}
      </CloseButton>
    </ChakraDialog.CloseTrigger>
  );
});

export const DialogRoot = ChakraDialog.Root;
export const DialogFooter = ChakraDialog.Footer;
export const DialogHeader = ChakraDialog.Header;
export const DialogBody = ChakraDialog.Body;
export const DialogBackdrop = ChakraDialog.Backdrop;
export const DialogTitle = ChakraDialog.Title;
export const DialogDescription = ChakraDialog.Description;
export const DialogTrigger = ChakraDialog.Trigger;
export const DialogActionTrigger = ChakraDialog.ActionTrigger;

interface DialogProps {
  placement?: ConditionalValue<"bottom" | "top" | "center">;
  title: string;
  children: React.ReactNode;
  trigger?: React.ReactNode;
  onOpenChange: (event: DialogOpenChangeDetails) => void;
  isOpen: boolean;
}
export const Dialog = ({
  placement = "top",
  title,
  children,
  trigger,
  onOpenChange,
  isOpen,
}: DialogProps) => {
  return (
    <DialogRoot
      placement={placement}
      initialFocusEl={() => null}
      motionPreset="slide-in-bottom"
      onOpenChange={onOpenChange}
      open={isOpen}
    >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <DialogBody>{children}</DialogBody>

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

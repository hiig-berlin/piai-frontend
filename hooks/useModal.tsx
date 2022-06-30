import { useCallback, useState, useRef } from "react";

export type useModalReturnType = {
  isOpen: boolean;
  isClosing: boolean;
  isOpening: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export type useModalProps = {
  defaultIsOpen?: boolean;
  openingAnimationLength?: number;
  closeAnimationLength?: number;
};

export const useModal = ({
  defaultIsOpen = false,
  openingAnimationLength = 500,
  closeAnimationLength = 250,
}: useModalProps = {}): useModalReturnType => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const isAnimatingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const open = useCallback(() => {
    setIsClosing(false);
    setIsOpening(true);

    if (isAnimatingTimeoutRef.current)
      clearTimeout(isAnimatingTimeoutRef.current);

    isAnimatingTimeoutRef.current = setTimeout(() => {
      setIsOpening(false);
      setIsOpen(true);
    }, openingAnimationLength);
  }, [openingAnimationLength]);

  const close = useCallback(() => {
    setIsClosing(true);
    setIsOpening(false);

    if (isAnimatingTimeoutRef.current)
      clearTimeout(isAnimatingTimeoutRef.current);

    isAnimatingTimeoutRef.current = setTimeout(() => {
      setIsClosing(false);
      setIsOpen(false);
    }, closeAnimationLength);
  }, [closeAnimationLength]);

  const toggle = useCallback(() => {
    console.log(isOpen, isOpening);
    if (isOpen || isOpening) {
      close();
    } else {
      open();
    }
  }, [isOpen, isOpening, close, open]);

  return {
    isOpen,
    isOpening,
    isClosing,
    open,
    close,
    toggle,
  };
};

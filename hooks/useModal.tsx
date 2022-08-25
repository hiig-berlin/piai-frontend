import { useCallback, useState, useRef } from "react";

export type useModalReturnType = {
  isOpen: boolean;
  isClosing: boolean;
  isOpening: boolean;
  status: string;
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
  const isAnimatingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const isOpenRef = useRef(defaultIsOpen);
  const isOpeningRef = useRef(false);
  const isClosingRef = useRef(false);

  const [status, setStatus] = useState(defaultIsOpen ? "open" : "closed");

  const open = useCallback(() => {
    isOpenRef.current = false;
    isClosingRef.current = false;
    isOpeningRef.current = true;
    setStatus("opening");

    if (isAnimatingTimeoutRef.current)
      clearTimeout(isAnimatingTimeoutRef.current);

    isAnimatingTimeoutRef.current = setTimeout(() => {
      isOpeningRef.current = false;
      isOpenRef.current = true;
      setStatus("open");
    }, openingAnimationLength);
  }, [openingAnimationLength]);

  const close = useCallback(() => {
    isClosingRef.current = true;
    isOpeningRef.current = false;
    setStatus("closing");

    if (isAnimatingTimeoutRef.current)
      clearTimeout(isAnimatingTimeoutRef.current);

    isAnimatingTimeoutRef.current = setTimeout(() => {
      isClosingRef.current = false;
      isOpenRef.current = false;
      setStatus("closed");
    }, closeAnimationLength);
  }, [closeAnimationLength]);

  const toggle = useCallback(() => {
    if (isOpenRef.current || isOpeningRef.current) {
      close();
    } else {
      open();
    }
  }, [close, open]);

  return {
    isOpen: isOpenRef.current,
    isOpening: isOpeningRef.current,
    isClosing: isClosingRef.current,
    status,
    open,
    close,
    toggle,
  };
};

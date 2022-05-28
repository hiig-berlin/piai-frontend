import React, { createContext, useContext, useState, useCallback, useRef } from "react";

import useIsMounted from "~/hooks/useIsMounted";

type MenuContextType = {
  isOpen: boolean;
  getIsOpen: Function;
  open: Function;
  close: Function;
}
// create context
const MenuContext = createContext<MenuContextType>({
  isOpen: false,
  getIsOpen: () => false,
  open: () => {},
  close: () => {},
});

export const useMenuContext = () => useContext(MenuContext);

// context provider
export const MenuContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const buttonRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const currentScrollbarWidthRef = useRef(0);

  const isMounted = useIsMounted();

  const isOpenRef = useRef(false);

  const [showMenu, setShowMenu] = useState(false);
  
  const open = useCallback((button: React.MutableRefObject<HTMLButtonElement>) => {
    if (isMounted) {
      buttonRef.current = button.current;
      if (animationTimeoutRef.current) 
        clearTimeout(animationTimeoutRef.current);

      setShowMenu(true);
      isOpenRef.current = true;

      currentScrollbarWidthRef.current = window.innerWidth - document.body.offsetWidth;
      
      document.body.style.overflow = 'hidden';
      document.documentElement.style.setProperty('--sbw', `${currentScrollbarWidthRef.current}px`);

      if (currentScrollbarWidthRef.current > 0) {
        document.body.style.borderRight = `var(--sbw) solid var(--color-bg, #fff)`;
      }
    }
  }, [isMounted]);

  const close = useCallback(() => {
    if (isMounted) {
      setShowMenu(false);
      isOpenRef.current = false;

      document.body.style.overflow = '';

      if (currentScrollbarWidthRef.current > 0) {
        document.body.style.borderRight = "";
      }

      if (buttonRef.current) {
        setTimeout(() => {
          if (buttonRef.current) buttonRef.current.focus();
        }, 100)
      }
      
    }
  }, [isMounted]);
  
  const getIsOpen = useCallback(() => isOpenRef.current, []);
  
  return (
    <MenuContext.Provider value={{
      isOpen: showMenu,
      getIsOpen,
      open,
      close,
    }}>
      {children}
    </MenuContext.Provider>
  );
};

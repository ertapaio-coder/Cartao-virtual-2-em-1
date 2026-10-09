import { createContext, useContext, useState, ReactNode } from 'react';

interface CheckoutModalContextType {
  isOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const CheckoutModalContext = createContext<CheckoutModalContextType | undefined>(undefined);

export const CheckoutModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openCheckout = () => setIsOpen(true);
  const closeCheckout = () => setIsOpen(false);

  return (
    <CheckoutModalContext.Provider value={{ isOpen, openCheckout, closeCheckout }}>
      {children}
    </CheckoutModalContext.Provider>
  );
};

export const useCheckoutModal = () => {
  const context = useContext(CheckoutModalContext);
  if (!context) {
    return {
      isOpen: false,
      openCheckout: () => {},
      closeCheckout: () => {},
    };
  }
  return context;
};

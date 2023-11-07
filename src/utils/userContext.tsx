import { createContext, useContext } from "react";

export type Currency = "usd" | "cad";

export interface UserContextState {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

//This is the context that stores the selected currency, see layout.tsx for usage
export const UserContext = createContext<UserContextState>({
  currency: "usd",
  setCurrency: () => {},
});

/*
 * This just provides an easier way for pages/components to use the context
 * const { currency } = useUserContext() vs const { currency } = useContext(UserContext);
 */
export function useUserContext() {
  return useContext(UserContext);
}
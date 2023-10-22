import { createContext, useContext } from "react";

export type Currency = "usd" | "cad";

export interface UserContextState {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const UserContext = createContext<UserContextState>({
  currency: "usd",
  setCurrency: () => {},
});

export function useUserContext() {
  return useContext(UserContext);
}

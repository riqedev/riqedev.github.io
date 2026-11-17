import { createContext, useContext } from "react";

interface CommandMenuState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CommandMenuContext = createContext<CommandMenuState>({ open: false, setOpen: () => {} });

export const useCommandMenu = () => useContext(CommandMenuContext);

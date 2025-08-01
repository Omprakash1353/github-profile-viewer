import { createContext } from "react";
import { ThemeContextType } from "../components/ThemeProvider";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

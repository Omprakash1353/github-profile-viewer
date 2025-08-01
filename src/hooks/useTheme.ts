import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { ThemeContextType } from "../components/ThemeProvider";

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

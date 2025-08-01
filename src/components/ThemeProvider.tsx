import React, {
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from "react";
import { createTheme, ThemeProvider as MuiThemeProvider, Theme } from "@mui/material/styles";
import { ThemeContext } from "../context/ThemeContext";

export interface ThemeContextType {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProviderComponent: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const theme: Theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

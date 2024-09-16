import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { createTheme, ThemeProvider, Theme } from "@mui/material/styles";

interface ThemeContextType {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProviderComponent: React.FC<ThemeProviderProps> = ({
  children,
}) => {
  const storedMode = localStorage.getItem("theme") as "light" | "dark" | null;
  const [mode, setMode] = useState<"light" | "dark">(storedMode || "light");

  const theme: Theme = createTheme({
    palette: {
      mode,
    },
  });

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  useEffect(() => {
    if (storedMode) {
      setMode(storedMode);
    }
  }, [storedMode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { FC } from "react";
import { useTheme } from "../../hooks/useTheme";

export const ThemeToggleButton: FC = () => {
  const { toggleTheme, mode } = useTheme();

  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <IconButton onClick={toggleTheme}>
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </motion.div>
  );
};

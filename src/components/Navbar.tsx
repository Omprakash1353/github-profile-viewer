import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { useTheme } from "./ThemeProvider";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export const Navbar = () => {
  const { toggleTheme, mode } = useTheme();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: "#fff",
            textDecoration: "none",
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          GitHub Search
        </Typography>

        <IconButton onClick={toggleTheme} color="inherit">
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

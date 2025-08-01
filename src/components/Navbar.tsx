import {
  AppBar,
  Container,
  Toolbar,
} from "@mui/material";
import { FC } from "react";
import { HideOnScroll } from "./common/HideOnScroll";
import { Logo } from "./layout/Logo";
import { NavLinks } from "./layout/NavLinks";
import { ThemeToggleButton } from "./ui/ThemeToggleButton";

interface NavItem {
  name: string;
  path: string;
}

interface NavbarProps {
  navItems?: NavItem[];
  title?: string;
}

export const Navbar: FC<NavbarProps> = ({
  navItems = [
    { name: "Home", path: "/" },
    { name: "Trending", path: "/trending" },
  ],
  title = "GitHub Search",
}) => {
  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.8)"
              : "rgba(18, 18, 18, 0.8)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Logo title={title} />
            <NavLinks navItems={navItems} />
            <ThemeToggleButton />
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};
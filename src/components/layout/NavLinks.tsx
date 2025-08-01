import { Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

interface NavItem {
  name: string;
  path: string;
}

interface NavLinksProps {
  navItems: NavItem[];
}

export const NavLinks: FC<NavLinksProps> = ({ navItems }) => (
  <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
    {navItems.map((item) => (
      <motion.div key={item.name} whileHover={{ y: -2 }}>
        <Button
          component={RouterLink}
          to={item.path}
          sx={{
            color: "text.primary",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          {item.name}
        </Button>
      </motion.div>
    ))}
  </Box>
);

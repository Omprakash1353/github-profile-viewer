import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

interface LogoProps {
  title?: string;
}

export const Logo: FC<LogoProps> = ({ title }) => (
  <Box
    component={RouterLink}
    to="/"
    sx={{
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      gap: 1,
    }}
  >
    <motion.div
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
    >
      <GitHubIcon sx={{ fontSize: 32, color: "text.primary" }} />
    </motion.div>
    <Typography
      variant="h6"
      sx={{
        color: "text.primary",
        fontWeight: 700,
        display: { xs: "none", sm: "block" },
      }}
    >
      {title}
    </Typography>
  </Box>
);

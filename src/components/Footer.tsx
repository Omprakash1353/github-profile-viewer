import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1976d2",
        color: "#fff",
        textAlign: "center",
        padding: { xs: "1rem" },
        position: "relative",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body2">
        &copy; 2024 Your Company. All rights reserved.
      </Typography>
    </Box>
  );
};

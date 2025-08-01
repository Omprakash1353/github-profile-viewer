import { Box, CircularProgress, Typography } from "@mui/material";
import { FC } from "react";

interface LoaderProps {
  size?: number;
  color?: "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
  text?: string;
}

export const Loader: FC<LoaderProps> = ({
  size = 40,
  color = "primary",
  text = "Loading...",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <CircularProgress size={size} color={color} />
      {text && <Typography variant="h6">{text}</Typography>}
    </Box>
  );
};

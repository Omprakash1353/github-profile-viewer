import { Box, Typography } from "@mui/material";
import { FC } from "react";

interface FooterProps {
  backgroundColor?: string;
  textColor?: string;
  copyrightText?: string;
}

export const Footer: FC<FooterProps> = ({
  backgroundColor = "#1976d2",
  textColor = "#fff",
  copyrightText = `© ${new Date().getFullYear()} Your Company. All rights reserved.`,
}) => {
  const footerStyles = {
    backgroundColor,
    color: textColor,
    textAlign: "center",
    padding: "1rem",
    position: "relative",
    bottom: 0,
    width: "100%",
  };

  return (
    <Box component="footer" sx={footerStyles}>
      <Typography variant="body2">{copyrightText}</Typography>
    </Box>
  );
};

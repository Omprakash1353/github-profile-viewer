import { Typography } from "@mui/material";
import { FC } from "react";

export const Header: FC = () => (
  <>
    <Typography 
      variant="h2" 
      sx={{ 
        color: (theme) => theme.palette.mode === 'light' ? '#1976d2' : '#90caf9',
        fontWeight: 800,
        textAlign: 'center',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        mb: 1,
        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' }
      }}
    >
      GitHub Search
    </Typography>
    <Typography
      variant="h6"
      sx={{ 
        color: 'text.secondary',
        textAlign: "center",
        marginBottom: 2,
        fontWeight: 400,
        fontSize: { xs: '1rem', sm: '1.25rem' }
      }}
    >
      Explore GitHub profiles with ease
    </Typography>
  </>
);

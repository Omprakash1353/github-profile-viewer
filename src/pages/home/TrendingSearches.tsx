import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { FC } from "react";

const trendingSearches = ['facebook', 'google', 'microsoft', 'apple', 'netflix'];

interface TrendingSearchesProps {
  setUsername: (username: string) => void;
}

export const TrendingSearches: FC<TrendingSearchesProps> = ({ setUsername }) => (
  <Box sx={{ textAlign: 'center', mt: 4 }}>
    <Typography
      variant="subtitle1"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        color: 'text.secondary',
        mb: 2
      }}
    >
      <TrendingUpIcon />
      Popular Searches
    </Typography>
    <Stack
      direction="row"
      spacing={1}
      justifyContent="center"
      flexWrap="wrap"
      sx={{ gap: 1 }}
    >
      {trendingSearches.map((org) => (
        <Chip
          key={org}
          label={org}
          onClick={() => setUsername(org)}
          clickable
          sx={{
            backgroundColor: (theme) => 
              theme.palette.mode === 'light'
                ? 'rgba(25, 118, 210, 0.1)'
                : 'rgba(144, 202, 249, 0.1)',
            '&:hover': {
              backgroundColor: (theme) => 
                theme.palette.mode === 'light'
                  ? 'rgba(25, 118, 210, 0.2)'
                  : 'rgba(144, 202, 249, 0.2)',
            }
          }}
        />
      ))}
    </Stack>
  </Box>
);

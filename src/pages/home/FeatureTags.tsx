import { Chip, Stack } from "@mui/material";
import { FC } from "react";

const features = ['Real-time data', 'Profile analytics', 'Repository insights', 'User statistics'];

export const FeatureTags: FC = () => (
  <Stack
    direction="row"
    spacing={1}
    justifyContent="center"
    flexWrap="wrap"
    sx={{ mb: 4, gap: 1 }}
  >
    {features.map((feature) => (
      <Chip
        key={feature}
        label={feature}
        sx={{
          backgroundColor: (theme) => 
            theme.palette.mode === 'light' 
              ? 'rgba(25, 118, 210, 0.1)'
              : 'rgba(144, 202, 249, 0.1)',
          borderRadius: '16px',
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
);

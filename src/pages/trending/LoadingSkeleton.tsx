import { Grid, Skeleton } from "@mui/material";
import { FC } from "react";

export const LoadingSkeleton: FC = () => (
  <Grid container spacing={3}>
    {[...Array(6)].map((_, index) => (
      <Grid item xs={12} key={index}>
        <Skeleton variant="rectangular" height={200} />
      </Grid>
    ))}
  </Grid>
);

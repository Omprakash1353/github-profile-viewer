import {
  Box,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useTrendingRepos } from "./trending/hooks/useTrendingRepos";
import { LoadingSkeleton } from "./trending/LoadingSkeleton";
import { RepoCard } from "./trending/RepoCard";

export default function TrendingPage() {
  const { data: trendingData, isLoading } = useTrendingRepos();

  return (
    <Paper
      elevation={0}
      sx={{
        padding: 4,
        maxWidth: "1500px",
        margin: "auto",
        marginTop: { xs: "64px", sm: "72px" },
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight={700} mb={2}>
          Trending Repositories
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover the most popular repositories on GitHub.
        </Typography>
      </Box>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <Grid container spacing={3}>
          {trendingData?.items?.map((repo, index) => (
            <Grid item xs={12} key={repo.id}>
              <RepoCard repo={repo} index={index} />
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );
}
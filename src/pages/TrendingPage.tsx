import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Link,
  Paper,
  Typography,
  Skeleton,
  Chip,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import StarIcon from "@mui/icons-material/Star";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import CircleIcon from "@mui/icons-material/Circle";
import { motion } from "framer-motion";
import langColors from "../constants/langColor";

const trendingReposQuery = () => {
  return useQuery({
    queryKey: ["trendingRepos"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.github.com/search/repositories?q=created:>2024-01-01&sort=stars&order=desc&per_page=25"
      );
      return response.json();
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

const LoadingSkeleton = () => (
  <Grid container spacing={3}>
    {[...Array(6)].map((_, index) => (
      <Grid item xs={12} key={index}>
        <Skeleton variant="rectangular" height={200} />
      </Grid>
    ))}
  </Grid>
);

export default function TrendingPage() {
  const { data: trendingData, isLoading } = trendingReposQuery();

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num;
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        maxWidth: "1500px",
        margin: "auto",
        marginTop: { xs: "64px", sm: "72px" },
        boxShadow: "none",
        bgcolor: "background.default",
        borderRadius: 0,
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: "linear-gradient(45deg, #007FFF, #0059B2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Trending Repositories
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Discover the most popular repositories on GitHub
        </Typography>
      </Box>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <Grid container spacing={3}>
          {trendingData?.items?.map((repo: any, index: number) => (
            <Grid item xs={12} key={repo.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  elevation={2}
                  sx={{
                    "&:hover": {
                      transform: "translateY(-4px)",
                      transition: "transform 0.2s ease-in-out",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Grid container spacing={3}>
                      {/* Repository Info */}
                      <Grid item xs={12} md={8}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <Avatar
                            src={repo.owner.avatar_url}
                            sx={{ width: 40, height: 40, mr: 2 }}
                          />
                          <Box>
                            <Link
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener"
                              sx={{
                                textDecoration: "none",
                                color: "primary.main",
                                fontWeight: "bold",
                                fontSize: "1.2rem",
                                "&:hover": { textDecoration: "underline" },
                              }}
                            >
                              {repo.full_name}
                            </Link>
                            {repo.private && (
                              <Chip
                                label="Private"
                                size="small"
                                sx={{ ml: 1 }}
                                color="warning"
                              />
                            )}
                          </Box>
                        </Box>

                        <Typography variant="body1" sx={{ mb: 2 }}>
                          {repo.description || "No description available"}
                        </Typography>

                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                          {repo.language && (
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <CircleIcon
                                sx={{
                                  fontSize: 12,
                                  mr: 0.5,
                                  color: langColors.get(repo.language) || "gray",
                                }}
                              />
                              <Typography variant="body2">
                                {repo.language}
                              </Typography>
                            </Box>
                          )}
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <StarIcon
                              sx={{ fontSize: 16, mr: 0.5, color: "#ffb400" }}
                            />
                            <Typography variant="body2">
                              {formatNumber(repo.stargazers_count)} stars
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <ForkRightIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="body2">
                              {formatNumber(repo.forks_count)} forks
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      {/* Stats Section */}
                      <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          borderLeft: { md: 1 },
                          borderColor: "divider",
                          pl: { md: 3 },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            textAlign: "center",
                          }}
                        >
                          <Box>
                            <Typography
                              variant="h4"
                              color="primary"
                              sx={{ fontWeight: "bold" }}
                            >
                              {formatNumber(repo.stargazers_count)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Stars
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="h4"
                              color="secondary"
                              sx={{ fontWeight: "bold" }}
                            >
                              {formatNumber(repo.forks_count)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Forks
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );
} 
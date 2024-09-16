import { CircleRounded } from "@mui/icons-material";
import RepoIcon from "@mui/icons-material/Description";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import StarIcon from "@mui/icons-material/Star";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router-dom";

import langColors from "../constants/langColor";

const userDataQuery = (id: string) => {
  return useQuery({
    queryKey: ["user", { id }],
    queryFn: () =>
      fetch(`https://api.github.com/users/${id}`).then((res) => res.json()),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    enabled: !!id,
  });
};

const userOrgsQuery = (id: string) => {
  return useQuery({
    queryKey: ["userOrgs", { id }],
    queryFn: () =>
      fetch(`https://api.github.com/users/${id}/orgs`).then((res) =>
        res.json()
      ),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    enabled: !!id,
  });
};

const userRepoQuery = (id: string) => {
  return useQuery({
    queryKey: ["userRepos", { id }],
    queryFn: () =>
      fetch(`https://api.github.com/users/${id}/repos`).then((res) =>
        res.json()
      ),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    enabled: !!id,
  });
};

function formatJoinDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export default function ProfilePage() {
  const { id } = useParams();
  const [sortCriteria, setSortCriteria] = useState<string>("stars");

  const { data: userData, isLoading: isLoadingUser } = userDataQuery(id!);
  const { data: userOrgs, isLoading: isLoadingOrgs } = userOrgsQuery(id!);
  const { data: userRepos, isLoading: isLoadingRepos } = userRepoQuery(id!);

  const isLoading = isLoadingUser || isLoadingOrgs || isLoadingRepos;

  const sortedRepos = userRepos
    ? [...userRepos].sort((a: any, b: any) => {
        if (sortCriteria === "stars") {
          return b.stargazers_count - a.stargazers_count;
        } else if (sortCriteria === "forks") {
          return b.forks_count - a.forks_count;
        } else if (sortCriteria === "size") {
          return b.size - a.size;
        }
        return 0;
      })
    : [];

  const handleSortChange = (event: any) => {
    setSortCriteria(event.target.value);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        maxWidth: "1500px",
        margin: "auto",
        boxShadow: "none",
        bgcolor: "background.default",
        borderRadius: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          marginBottom: 4,
          padding: 3,
          backgroundColor: "background.paper",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : userData?.message === "Not Found" ? (
          <Typography variant="h5" sx={{ color: "error.main" }}>
            User Not Found
          </Typography>
        ) : (
          <>
            <Avatar
              src={userData?.avatar_url}
              sx={{
                width: 120,
                height: 120,
                marginBottom: 2,
                border: "4px solid #1976d2",
                boxShadow: 4,
              }}
            />
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
              {userData?.login}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
              Joined: {formatJoinDate(userData?.created_at)}
            </Typography>

            {/* Additional User Info */}
            {userData?.bio && (
              <Typography variant="body1" sx={{ mb: 1 }}>
                {userData.bio}
              </Typography>
            )}
            {userData?.location && (
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                Location: {userData.location}
              </Typography>
            )}
            {userData?.blog && (
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                Blog:{" "}
                <Link href={userData.blog} target="_blank" rel="noopener">
                  {userData.blog}
                </Link>
              </Typography>
            )}
            <Link href={userData.html_url} target="_blank" rel="noopener">
              View GitHub Profile
            </Link>

            <Grid container justifyContent="center" spacing={4} sx={{ mb: 2 }}>
              {[
                {
                  icon: <PeopleIcon />,
                  count: userData?.followers,
                  label: "Followers",
                },
                {
                  icon: <PersonAddIcon />,
                  count: userData?.following,
                  label: "Following",
                },
                {
                  icon: <RepoIcon />,
                  count: userData?.public_repos,
                  label: "Repositories",
                },
                {
                  icon: <StarIcon />,
                  count: userData?.public_gists,
                  label: "Gists",
                },
                {
                  icon: <ForkRightIcon />,
                  count: userOrgs?.length || 0,
                  label: "Organizations",
                },
              ].map((stat, index) => (
                <Grid item xs={2} key={index}>
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 2,
                        borderRadius: 1,
                        boxShadow: 1,
                        transition: "0.3s",
                        "&:hover": { boxShadow: 3, transform: "scale(1.05)" },
                      }}
                    >
                      {stat.icon}
                      <Typography variant="h6">{stat.count ?? 0}</Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
      <Divider sx={{ marginBottom: 4 }} />

      <Grid container spacing={4} sx={{ marginBottom: 4 }}>
        {[
          { title: "User Activity" },
          { title: "Stars per Repository" },
          { title: "Language Usage" },
        ].map((chart, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ boxShadow: 4 }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  {chart.title}
                </Typography>
                <Box sx={{ p: 2 }}>{/* <chart.ChartComponent /> */}</Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ marginBottom: 4 }} />

      <Box sx={{ mb: 4 }}>
        {/* Top Section Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Top Repos
          </Typography>

          {/* Sort Dropdown */}
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="sort-by-label">by</InputLabel>
            <Select
              labelId="sort-by-label"
              value={sortCriteria}
              onChange={handleSortChange}
              label="by"
              sx={{ boxShadow: 1, borderRadius: 2 }}
            >
              <MenuItem value="stars">Stars</MenuItem>
              <MenuItem value="forks">Forks</MenuItem>
              <MenuItem value="size">Size</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Repositories Grid */}
        <Grid container spacing={3}>
          {sortedRepos?.map((repo: any, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card elevation={3} sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        ml: 0.5,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Link href={repo.html_url} target="_blank" rel="noopener">
                        {repo.name}
                      </Link>
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                      }}
                    >
                      {/* Left Side Stats */}
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CircleRounded
                            fontSize="small"
                            sx={{
                              color: langColors.get(repo?.language) || "gray",
                            }}
                          />
                          <Typography variant="body2" sx={{ ml: 0.5 }}>
                            {repo?.language}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <StarIcon
                            fontSize="small"
                            sx={{ color: "#ffcc00" }}
                          />
                          <Typography variant="body2" sx={{ ml: 0.5 }}>
                            {repo.stargazers_count}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <ForkRightIcon fontSize="small" />
                          <Typography variant="body2" sx={{ ml: 0.5 }}>
                            {repo.forks_count}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Right Side Size */}
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body2" sx={{ ml: 0.5 }}>
                          {repo.size} KB
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}

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
  useTheme,
  IconButton,
  TextField,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchIcon from "@mui/icons-material/Search";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";
import { Skeleton } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import TwitterIcon from "@mui/icons-material/Twitter";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

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
      fetch(`https://api.github.com/users/${id}/repos?per_page=100`).then(
        (res) => res.json()
      ),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    enabled: !!id,
  });
};

const trendingReposQuery = () => {
  return useQuery({
    queryKey: ["trendingRepos"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&per_page=5"
      );
      return response.json();
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
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
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState(0);
  const theme = useTheme();

  const { data: userData, isLoading: isLoadingUser } = userDataQuery(id!);
  const { data: userOrgs, isLoading: isLoadingOrgs } = userOrgsQuery(id!);
  const { data: userRepos, isLoading: isLoadingRepos } = userRepoQuery(id!);
  const { data: trendingRepos } = trendingReposQuery();

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

  const LoadingSkeleton = () => (
    <Box sx={{ width: "100%" }}>
      <Skeleton variant="circular" width={120} height={120} sx={{ mb: 2 }} />
      <Skeleton variant="text" sx={{ fontSize: "2rem", mb: 1 }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem", mb: 2 }} width="60%" />
    </Box>
  );

  const filteredAndSortedRepos = sortedRepos?.filter((repo: any) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const languageData = userRepos
    ? Object.entries(
        userRepos.reduce((acc: any, repo: any) => {
          if (repo.language) {
            acc[repo.language] = (acc[repo.language] || 0) + 1;
          }
          return acc;
        }, {})
      ).map(([name, value]) => ({ name, value }))
    : [];

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
      <IconButton
        sx={{ position: "absolute", right: 20, top: 20 }}
        onClick={() => {
          // Implement theme toggle logic
        }}
      >
        {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

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
          <LoadingSkeleton />
        ) : userData?.message === "Not Found" ? (
          <Typography variant="h5" sx={{ color: "error.main" }}>
            User Not Found
          </Typography>
        ) : (
          <Box sx={{ width: "100%" }}>
            {/* Profile Header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 4,
                mb: 4,
                flexDirection: { xs: "column", md: "row" },
                // alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              {/* Avatar Section */}
              <Avatar
                src={userData?.avatar_url}
                sx={{
                  width: 180,
                  height: 180,
                  border: "4px solid",
                  borderColor: "primary.main",
                  boxShadow: theme.shadows[8],
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />

              {/* User Info Section */}
              <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {userData?.name || userData?.login}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "text.secondary", mb: 2 }}
                >
                  @{userData?.login}
                </Typography>

                {userData?.bio && (
                  <Typography variant="body1" sx={{ mb: 2, maxWidth: "600px" }}>
                    {userData.bio}
                  </Typography>
                )}

                {/* Contact Info Grid */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {userData?.location && (
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <LocationOnIcon color="action" />
                        <Typography variant="body2">
                          {userData.location}
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                  {userData?.email && (
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <EmailIcon color="action" />
                        <Link href={`mailto:${userData.email}`}>
                          {userData.email}
                        </Link>
                      </Box>
                    </Grid>
                  )}
                  {userData?.blog && (
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <LinkIcon color="action" />
                        <Link
                          href={userData.blog}
                          target="_blank"
                          rel="noopener"
                        >
                          {userData.blog.replace(/^https?:\/\//, "")}
                        </Link>
                      </Box>
                    </Grid>
                  )}
                  {userData?.twitter_username && (
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <TwitterIcon color="action" />
                        <Link
                          href={`https://twitter.com/${userData.twitter_username}`}
                          target="_blank"
                          rel="noopener"
                        >
                          @{userData.twitter_username}
                        </Link>
                      </Box>
                    </Grid>
                  )}
                </Grid>

                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Joined {formatJoinDate(userData?.created_at)}
                </Typography>
              </Box>
            </Box>

            {/* Stats Grid */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
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
                <Grid item xs={6} sm={4} md={2.4} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Paper
                      elevation={2}
                      sx={{
                        p: 2,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                        borderRadius: 2,
                        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                        border: 1,
                        borderColor: "divider",
                      }}
                    >
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Typography variant="h5" fontWeight="bold">
                        {stat.count?.toLocaleString() ?? 0}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                      >
                        {stat.label}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
      <Divider sx={{ marginBottom: 4 }} />

      <Tabs
        value={currentTab}
        onChange={(_, newValue) => setCurrentTab(newValue)}
        sx={{ mb: 4 }}
      >
        <Tab label="Overview" />
        <Tab label="Repositories" />
        <Tab label="Analytics" />
      </Tabs>

      {currentTab === 0 && (
        <Grid container spacing={4} sx={{ marginBottom: 4 }}>
          {/* Language Distribution */}
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Language Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={languageData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {languageData.map((entry: any, index: number) => (
                        <Cell
                          key={index}
                          fill={langColors.get(entry.name) || "#ccc"}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} md={8}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Repositories
                </Typography>
                <Grid container spacing={2}>
                  {sortedRepos?.slice(0, 4).map((repo: any) => (
                    <Grid item xs={12} sm={6} key={repo.id}>
                      <Box
                        sx={{
                          p: 2,
                          border: 1,
                          borderColor: "divider",
                          borderRadius: 2,
                          "&:hover": {
                            bgcolor: "action.hover",
                          },
                        }}
                      >
                        <Link
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener"
                          sx={{ textDecoration: "none" }}
                        >
                          <Typography variant="subtitle1" fontWeight="bold">
                            {repo.name}
                          </Typography>
                        </Link>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {repo.description || "No description available"}
                        </Typography>
                        <Box
                          sx={{
                            mt: 1,
                            display: "flex",
                            gap: 2,
                            alignItems: "center",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CircleRounded
                              fontSize="small"
                              sx={{
                                color: langColors.get(repo?.language) || "gray",
                              }}
                            />
                            <Typography variant="body2" sx={{ ml: 0.5 }}>
                              {repo?.language || "Unknown"}
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
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {currentTab === 1 && (
        <Box>
          {/* Search and Sort Controls */}
          <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1 }} />,
              }}
            />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="sort-by-label">Sort by</InputLabel>
              <Select
                labelId="sort-by-label"
                value={sortCriteria}
                onChange={handleSortChange}
                label="Sort by"
              >
                <MenuItem value="stars">Stars</MenuItem>
                <MenuItem value="forks">Forks</MenuItem>
                <MenuItem value="size">Size</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Repository Grid */}
          <Grid container spacing={3}>
            {filteredAndSortedRepos?.map((repo: any, index: number) => (
              <Grid item xs={12} sm={6} md={4} key={repo.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card
                    elevation={3}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        transition: "transform 0.2s ease-in-out",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <Link
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener"
                            sx={{ textDecoration: "none" }}
                          >
                            {repo.name}
                          </Link>
                        </Typography>
                        {repo.private && (
                          <Box
                            sx={{
                              ml: 1,
                              px: 1,
                              py: 0.5,
                              bgcolor: "warning.light",
                              borderRadius: 1,
                            }}
                          >
                            <Typography variant="caption">Private</Typography>
                          </Box>
                        )}
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          height: "3em",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {repo.description || "No description available"}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CircleRounded
                            fontSize="small"
                            sx={{
                              color: langColors.get(repo?.language) || "gray",
                            }}
                          />
                          <Typography variant="body2" sx={{ ml: 0.5 }}>
                            {repo?.language || "Unknown"}
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

                      <Typography variant="caption" color="text.secondary">
                        Updated:{" "}
                        {new Date(repo.updated_at).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {currentTab === 2 && (
        <Grid container spacing={4}>
          {/* Repository Size Distribution */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Repository Size Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sortedRepos}>
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis
                      label={{
                        value: "Size (KB)",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip />
                    <Bar dataKey="size" fill={theme.palette.primary.main} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Language Distribution (Enhanced) */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Language Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={languageData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {languageData.map((entry: any, index: number) => (
                        <Cell
                          key={index}
                          fill={langColors.get(entry.name) || "#ccc"}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Most Starred Repositories */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Top Starred Repositories
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sortedRepos.slice(0, 5)}>
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis
                      label={{
                        value: "Stars",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="stargazers_count"
                      fill={theme.palette.secondary.main}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Repository Activity */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Repository Activity
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={sortedRepos.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis
                      yAxisId="left"
                      label={{
                        value: "Forks",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      label={{
                        value: "Issues",
                        angle: 90,
                        position: "insideRight",
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="forks_count"
                      stroke={theme.palette.primary.main}
                      name="Forks"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="open_issues_count"
                      stroke={theme.palette.secondary.main}
                      name="Open Issues"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Repository Stats Summary */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Repository Statistics
                </Typography>
                <Grid container spacing={3}>
                  {[
                    {
                      label: "Total Stars",
                      value: userRepos?.reduce(
                        (acc: number, repo: any) => acc + repo.stargazers_count,
                        0
                      ),
                    },
                    {
                      label: "Total Forks",
                      value: userRepos?.reduce(
                        (acc: number, repo: any) => acc + repo.forks_count,
                        0
                      ),
                    },
                    {
                      label: "Total Issues",
                      value: userRepos?.reduce(
                        (acc: number, repo: any) =>
                          acc + repo.open_issues_count,
                        0
                      ),
                    },
                    {
                      label: "Average Size (KB)",
                      value: Math.round(
                        userRepos?.reduce(
                          (acc: number, repo: any) => acc + repo.size,
                          0
                        ) / userRepos?.length
                      ),
                    },
                  ].map((stat, index) => (
                    <Grid item xs={6} md={3} key={index}>
                      <Box
                        sx={{
                          textAlign: "center",
                          p: 2,
                          bgcolor: "background.paper",
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="h4" color="primary">
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stat.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
}

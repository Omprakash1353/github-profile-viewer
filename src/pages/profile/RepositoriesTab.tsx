import { Box, Card, CardContent, FormControl, Grid, InputLabel, Link, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { FC, useMemo, useState } from "react";
import { Repo } from "./types";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import { CircleRounded } from "@mui/icons-material";
import langColors from "../../constants/langColor";

interface RepositoriesTabProps {
  userRepos: Repo[];
}

export const RepositoriesTab: FC<RepositoriesTabProps> = ({ userRepos }) => {
  const [sortCriteria, setSortCriteria] = useState<string>("stars");
  const [searchTerm, setSearchTerm] = useState("");

  const sortedRepos = useMemo(() => {
    if (!userRepos) return [];
    return [...userRepos].sort((a, b) => {
      switch (sortCriteria) {
        case "stars":
          return b.stargazers_count - a.stargazers_count;
        case "forks":
          return b.forks_count - a.forks_count;
        case "size":
          return b.size - a.size;
        default:
          return 0;
      }
    });
  }, [userRepos, sortCriteria]);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortCriteria(event.target.value);
  };

  const filteredAndSortedRepos = useMemo(
    () =>
      sortedRepos.filter((repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [sortedRepos, searchTerm]
  );

  return (
    <Box>
      <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          placeholder="Search repositories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} /> }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
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
      <Grid container spacing={3}>
        {filteredAndSortedRepos.map((repo, index) => (
          <Grid item xs={12} sm={6} md={4} key={repo.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6">
                    <Link href={repo.html_url} target="_blank">
                      {repo.name}
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {repo.description}
                  </Typography>
                  <Box display="flex" gap={2} alignItems="center">
                    {repo.language && (
                      <Box display="flex" alignItems="center">
                        <CircleRounded
                          fontSize="small"
                          sx={{
                            color: langColors.get(repo.language) || "gray",
                          }}
                        />{" "}
                        <Typography variant="body2">
                          {repo.language}
                        </Typography>
                      </Box>
                    )}
                    <Box display="flex" alignItems="center">
                      <StarIcon fontSize="small" /> {repo.stargazers_count}
                    </Box>
                    <Box display="flex" alignItems="center">
                      <ForkRightIcon fontSize="small" /> {repo.forks_count}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

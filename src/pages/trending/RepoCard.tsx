import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Link,
  Typography,
  Chip,
} from "@mui/material";
import { FC } from "react";
import { Repo } from "./types";
import StarIcon from "@mui/icons-material/Star";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import CircleIcon from "@mui/icons-material/Circle";
import { motion } from "framer-motion";
import langColors from "../../constants/langColor";

interface RepoCardProps {
  repo: Repo;
  index: number;
}

const formatNumber = (num: number): string => {
  return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
};

export const RepoCard: FC<RepoCardProps> = ({ repo, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    <Card elevation={2} sx={{ '&:hover': { boxShadow: 6 } }}>
      <CardContent>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar src={repo.owner.avatar_url} sx={{ width: 40, height: 40, mr: 2 }} />
              <Box>
                <Link href={repo.html_url} target="_blank" rel="noopener" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {repo.full_name}
                </Link>
                {repo.private && <Chip label="Private" size="small" sx={{ ml: 1 }} />}
              </Box>
            </Box>
            <Typography variant="body1" mb={2}>{repo.description}</Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
              {repo.language && (
                <Box display="flex" alignItems="center">
                  <CircleIcon sx={{ fontSize: 12, mr: 0.5, color: langColors.get(repo.language) || "gray" }} />
                  <Typography variant="body2">{repo.language}</Typography>
                </Box>
              )}
              <Box display="flex" alignItems="center">
                <StarIcon sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2">{formatNumber(repo.stargazers_count)}</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <ForkRightIcon sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2">{formatNumber(repo.forks_count)}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            <Box>
              <Typography variant="h4" color="primary">{formatNumber(repo.stargazers_count)}</Typography>
              <Typography variant="body2" color="text.secondary">Stars</Typography>
            </Box>
            <Box>
              <Typography variant="h4" color="secondary">{formatNumber(repo.forks_count)}</Typography>
              <Typography variant="body2" color="text.secondary">Forks</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </motion.div>
);

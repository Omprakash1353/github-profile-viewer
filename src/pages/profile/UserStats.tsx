import { Grid, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { User, Org } from "./types";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RepoIcon from "@mui/icons-material/Description";
import StarIcon from "@mui/icons-material/Star";
import ForkRightIcon from "@mui/icons-material/ForkRight";

interface UserStatsProps {
  userData: User;
  userOrgs: Org[];
}

export const UserStats: FC<UserStatsProps> = ({ userData, userOrgs }) => {
  const stats = [
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
    { icon: <StarIcon />, count: userData?.public_gists, label: "Gists" },
    {
      icon: <ForkRightIcon />,
      count: userOrgs?.length || 0,
      label: "Organizations",
    },
  ];

  return (
    <Grid container spacing={2} mb={4}>
      {stats.map((stat, index) => (
        <Grid item xs={6} sm={4} md={2.4} key={index}>
          <Paper elevation={1} sx={{ p: 2, textAlign: "center" }}>
            {stat.icon}
            <Typography variant="h5" fontWeight="bold">
              {stat.count?.toLocaleString() ?? 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {stat.label}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

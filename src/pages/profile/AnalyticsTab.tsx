import { Card, CardContent, Grid, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Repo } from "./types";

interface AnalyticsTabProps {
  userRepos: Repo[];
}

export const AnalyticsTab: FC<AnalyticsTabProps> = ({ userRepos }) => {
  const theme = useTheme();
  const sortedRepos = [...(userRepos || [])].sort((a, b) => b.stargazers_count - a.stargazers_count);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Repository Size (KB)</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sortedRepos}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="size" fill={theme.palette.primary.main} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Top Starred Repos</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sortedRepos.slice(0, 5)}>
                <XAxis dataKey="name" />
                <YAxis />
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
    </Grid>
  );
};

import { Card, CardContent, Grid, Typography, Box, Link } from "@mui/material";
import { FC } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import langColors from "../../constants/langColor";
import { Repo } from "./types";

interface OverviewTabProps {
  userRepos: Repo[];
}

export const OverviewTab: FC<OverviewTabProps> = ({ userRepos }) => {
  const languageData = (userRepos || []).reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const languageChartData = Object.entries(languageData).map(([name, value]) => ({ name, value }));

  const sortedRepos = [...(userRepos || [])].sort((a, b) => b.stargazers_count - a.stargazers_count);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Language Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={languageChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {languageChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
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
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6">Recent Repositories</Typography>
            <Grid container spacing={2}>
              {sortedRepos.slice(0, 4).map((repo) => (
                <Grid item xs={12} sm={6} key={repo.id}>
                  <Box
                    p={2}
                    border={1}
                    borderColor="divider"
                    borderRadius={2}
                  >
                    <Link href={repo.html_url} target="_blank">
                      <Typography variant="subtitle1">
                        {repo.name}
                      </Typography>
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                      {repo.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

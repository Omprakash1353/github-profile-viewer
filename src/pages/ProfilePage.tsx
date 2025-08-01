import {
  Box,
  Divider,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AnalyticsTab } from "./profile/AnalyticsTab";
import { useUserProfile } from "./profile/hooks/useUserProfile";
import { OverviewTab } from "./profile/OverviewTab";
import { RepositoriesTab } from "./profile/RepositoriesTab";
import { ProfileTabs } from "./profile/Tabs";
import { UserProfile } from "./profile/UserProfile";
import { UserStats } from "./profile/UserStats";

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { userData, userOrgs, userRepos, isLoading } = useUserProfile(id!);
  const [currentTab, setCurrentTab] = useState(0);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Skeleton variant="circular" width={120} height={120} sx={{ mb: 2 }} />
        <Skeleton variant="text" sx={{ fontSize: "2rem", mb: 1 }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", mb: 2 }} width="60%" />
      </Box>
    );
  }

  if (userData?.message === "Not Found") {
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h5" color="error">
          User Not Found
        </Typography>
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        maxWidth: "1500px",
        margin: "auto",
        mt: { xs: "64px", sm: "72px" },
      }}
    >
      {userData && <UserProfile userData={userData} />}
      {userData && userOrgs && <UserStats userData={userData} userOrgs={userOrgs} />}

      <Divider sx={{ mb: 4 }} />

      <ProfileTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {currentTab === 0 && userRepos && <OverviewTab userRepos={userRepos} />}
      {currentTab === 1 && userRepos && <RepositoriesTab userRepos={userRepos} />}
      {currentTab === 2 && userRepos && <AnalyticsTab userRepos={userRepos} />}
    </Paper>
  );
}
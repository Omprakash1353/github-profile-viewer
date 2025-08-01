import { Avatar, Box, Grid, Link, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { User } from "./types";
import { formatJoinDate } from "./utils";
import EmailIcon from "@mui/icons-material/Email";
import LinkIcon from "@mui/icons-material/Link";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface UserProfileProps {
  userData: User;
}

export const UserProfile: FC<UserProfileProps> = ({ userData }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "flex-start",
        gap: 4,
        mb: 4,
      }}
    >
      <Avatar
        src={userData?.avatar_url}
        sx={{
          width: 180,
          height: 180,
          border: `4px solid ${theme.palette.primary.main}`,
        }}
      />
      <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
        <Typography variant="h3" fontWeight={700}>
          {userData?.name || userData?.login}
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={2}>
          @{userData?.login}
        </Typography>
        {userData?.bio && (
          <Typography variant="body1" mb={2}>
            {userData.bio}
          </Typography>
        )}

        <Grid
          container
          spacing={1}
          sx={{ mb: 2, justifyContent: { xs: "center", md: "flex-start" } }}
        >
          {userData?.location && (
            <Grid item>
              <LocationOnIcon fontSize="small" /> {userData.location}
            </Grid>
          )}
          {userData?.email && (
            <Grid item>
              <EmailIcon fontSize="small" />{" "}
              <Link href={`mailto:${userData.email}`}>{userData.email}</Link>
            </Grid>
          )}
          {userData?.blog && (
            <Grid item>
              <LinkIcon fontSize="small" />{" "}
              <Link href={userData.blog} target="_blank">
                {userData.blog}
              </Link>
            </Grid>
          )}
          {userData?.twitter_username && (
            <Grid item>
              <Link
                href={`https://twitter.com/${userData.twitter_username}`}
                target="_blank"
              >
                @{userData.twitter_username}
              </Link>
            </Grid>
          )}
        </Grid>

        <Typography variant="caption" color="text.secondary">
          Joined {formatJoinDate(userData?.created_at || "")}
        </Typography>
      </Box>
    </Box>
  );
};

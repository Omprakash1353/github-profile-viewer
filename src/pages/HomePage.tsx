import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Button, IconButton, TextField, Typography, Container, Paper, Chip, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function SimpleContainer() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitted Username:", username);
    navigate(`/${username}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "95vh",
        width: "100%",
        gap: 4,
        background: (theme) => 
          theme.palette.mode === 'light' 
            ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
            : 'linear-gradient(135deg, #2C3E50 0%, #1a1a1a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />

      {/* Main content */}
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography 
            variant="h2" 
            sx={{ 
              color: (theme) => theme.palette.mode === 'light' ? '#1976d2' : '#90caf9',
              fontWeight: 800,
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              mb: 1,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' }
            }}
          >
            GitHub Search
          </Typography>
          <Typography
            variant="h6"
            sx={{ 
              color: 'text.secondary',
              textAlign: "center",
              marginBottom: 2,
              fontWeight: 400,
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            Explore GitHub profiles with ease
          </Typography>

          {/* Feature tags */}
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            flexWrap="wrap"
            sx={{ mb: 4, gap: 1 }}
          >
            {['Real-time data', 'Profile analytics', 'Repository insights', 'User statistics'].map((feature) => (
              <Chip
                key={feature}
                label={feature}
                sx={{
                  backgroundColor: (theme) => 
                    theme.palette.mode === 'light' 
                      ? 'rgba(25, 118, 210, 0.1)'
                      : 'rgba(144, 202, 249, 0.1)',
                  borderRadius: '16px',
                  '&:hover': {
                    backgroundColor: (theme) => 
                      theme.palette.mode === 'light'
                        ? 'rgba(25, 118, 210, 0.2)'
                        : 'rgba(144, 202, 249, 0.2)',
                  }
                }}
              />
            ))}
          </Stack>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: (theme) => 
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.8)'
                  : 'rgba(18, 18, 18, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: 'divider',
              textAlign: 'center',
              mb: 4
            }}
          >
            <IconButton
              aria-label="GitHub"
              href="https://github.com"
              target="_blank"
              sx={{
                color: (theme) => theme.palette.mode === 'light' ? '#333' : '#fff',
                fontSize: 80,
                marginBottom: 3,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1) rotate(360deg)',
                }
              }}
            >
              <GitHubIcon fontSize="inherit" />
            </IconButton>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.5rem",
              }}
            >
              <TextField
                label="GitHub Username"
                variant="outlined"
                value={username}
                autoComplete="off"
                required={true}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                }}
                sx={{
                  width: { xs: "100%", sm: "350px" },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: (theme) => 
                      theme.palette.mode === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.3s ease',
                    "& fieldset": {
                      borderWidth: "2px",
                      borderColor: "rgba(25, 118, 210, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#1976d2",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1976d2",
                    },
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                startIcon={<SearchIcon />}
                sx={{
                  width: { xs: "100%", sm: "200px" },
                  height: "48px",
                  borderRadius: "24px",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                  boxShadow: '0 3px 15px rgba(25, 118, 210, 0.3)',
                  transition: 'all 0.3s ease',
                  "&:hover": {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 5px 20px rgba(25, 118, 210, 0.4)',
                  },
                }}
              >
                Search Profile
              </Button>
            </motion.form>
          </Paper>

          {/* Trending section */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                color: 'text.secondary',
                mb: 2
              }}
            >
              <TrendingUpIcon />
              Popular Searches
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              flexWrap="wrap"
              sx={{ gap: 1 }}
            >
              {['facebook', 'google', 'microsoft', 'apple', 'netflix'].map((org) => (
                <Chip
                  key={org}
                  label={org}
                  onClick={() => setUsername(org)}
                  clickable
                  sx={{
                    backgroundColor: (theme) => 
                      theme.palette.mode === 'light'
                        ? 'rgba(25, 118, 210, 0.1)'
                        : 'rgba(144, 202, 249, 0.1)',
                    '&:hover': {
                      backgroundColor: (theme) => 
                        theme.palette.mode === 'light'
                          ? 'rgba(25, 118, 210, 0.2)'
                          : 'rgba(144, 202, 249, 0.2)',
                    }
                  }}
                />
              ))}
            </Stack>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

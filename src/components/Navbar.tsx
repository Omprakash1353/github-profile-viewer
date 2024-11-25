import { AppBar, Toolbar, Typography, IconButton, Box, Button, Container, useScrollTrigger, Slide } from "@mui/material";
import { useTheme } from "./ThemeProvider";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import GitHubIcon from "@mui/icons-material/GitHub";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export const Navbar = () => {
  const { toggleTheme, mode } = useTheme();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Trending", path: "/trending" },
  ];

  return (
    <HideOnScroll>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          background: (theme) => 
            theme.palette.mode === 'light'
              ? 'rgba(255, 255, 255, 0.8)'
              : 'rgba(18, 18, 18, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar 
            sx={{ 
              padding: { xs: 2, sm: 3 },
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            {/* Logo Section */}
            <Box 
              component={RouterLink} 
              to="/"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                textDecoration: 'none',
                gap: 1
              }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <GitHubIcon 
                  sx={{ 
                    fontSize: 32,
                    color: 'text.primary'
                  }} 
                />
              </motion.div>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.primary',
                  fontSize: { xs: "1.5rem", sm: "1.8rem" },
                  fontWeight: 700,
                  letterSpacing: '-0.5px',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                GitHub Search
              </Typography>
            </Box>

            {/* Navigation Items */}
            <Box 
              sx={{ 
                display: { xs: 'none', md: 'flex' },
                gap: 2
              }}
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Button
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: 'text.primary',
                      fontSize: '1rem',
                      textTransform: 'none',
                      fontWeight: 500,
                      px: 2,
                      borderRadius: 2,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '0%',
                        height: '2px',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'primary.main',
                        transition: 'width 0.3s ease-in-out',
                      },
                      '&:hover::after': {
                        width: '80%',
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                </motion.div>
              ))}
            </Box>

            {/* Theme Toggle */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconButton 
                onClick={toggleTheme} 
                sx={{
                  width: 40,
                  height: 40,
                  background: (theme) => 
                    theme.palette.mode === 'light'
                      ? 'rgba(0, 0, 0, 0.04)'
                      : 'rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    background: (theme) => 
                      theme.palette.mode === 'light'
                        ? 'rgba(0, 0, 0, 0.08)'
                        : 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                {mode === "light" ? (
                  <DarkModeIcon sx={{ fontSize: 24 }} />
                ) : (
                  <LightModeIcon sx={{ fontSize: 24 }} />
                )}
              </IconButton>
            </motion.div>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

import GitHubIcon from "@mui/icons-material/GitHub";
import SearchIcon from "@mui/icons-material/Search";
import { Button, IconButton, Paper, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { FC } from "react";

interface SearchFormProps {
  username: string;
  setUsername: (username: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const SearchForm: FC<SearchFormProps> = ({ username, setUsername, handleSubmit }) => (
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
);

import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        gap: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h4" sx={{ color: "#1976d2", fontWeight: "bold" }}>
          Welcome to GitHub Search
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#555", textAlign: "center", marginBottom: 2 }}
        >
          Enter a GitHub username to view the profile.
        </Typography>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <IconButton
          aria-label="GitHub"
          href="https://github.com"
          target="_blank"
          sx={{
            color: "black",
            fontSize: 70,
            marginBottom: 2,
          }}
        >
          <GitHubIcon fontSize="inherit" />
        </IconButton>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <TextField
          label="GitHub Username"
          variant="outlined"
          value={username}
          autoComplete="off"
          required={true}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            width: "300px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray",
              },
              "&:hover fieldset": {
                borderColor: "#1976d2",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
              },
            },
            "& .MuiInputLabel-root": {
              color: "gray",
            },
            "& .Mui-focused .MuiInputLabel-root": {
              color: "#1976d2",
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "150px",
            backgroundColor: "#1976d2",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#115293",
            },
          }}
        >
          Submit
        </Button>
      </motion.form>
    </Box>
  );
}

import { Box, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Background } from "./home/Background";
import { FeatureTags } from "./home/FeatureTags";
import { Header } from "./home/Header";
import { SearchForm } from "./home/SearchForm";
import { TrendingSearches } from "./home/TrendingSearches";

export default function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      <Background />

      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Header />
          <FeatureTags />
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SearchForm username={username} setUsername={setUsername} handleSubmit={handleSubmit} />
          <TrendingSearches setUsername={setUsername} />
        </motion.div>
      </Container>
    </Box>
  );
}
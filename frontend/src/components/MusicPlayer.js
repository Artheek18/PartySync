import React from "react";
import {
  Box,
  Card,
  Typography,
  IconButton,
  LinearProgress,
  Stack,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function MusicPlayer({
  title,
  artist,
  image_url,
  is_playing,
  time,
  duration,
}) {
  const songProgress = (time / duration) * 100;

  return (
      <Card
    sx={{
      display: "flex",
      alignItems: "center",
      padding: 3,
      maxWidth: 720, // increased width
      maxHeight: 300,
      mx: "auto",
      borderRadius: 4,
      backgroundColor: "#f4f4f4",
    }}
  >
    <Box
      component="img"
      src={image_url}
      alt="Album Art"
      sx={{
        width: 200, // increased size
        height: 200,
        borderRadius: 2,
        objectFit: "cover",
        flexShrink: 0,
      }}
    />

    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: 3, // more spacing
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ maxWidth: "65%" }}>
          <Typography variant="h5" fontWeight="bold" noWrap>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" noWrap>
            {artist}
          </Typography>
        </Box>
        <Box>
          <IconButton size="large">
            {is_playing ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
          </IconButton>
          <IconButton size="large">
            <SkipNextIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      <Box mt={3}>
        <LinearProgress
          variant="determinate"
          value={songProgress}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>
    </Box>
  </Card>
  );
}

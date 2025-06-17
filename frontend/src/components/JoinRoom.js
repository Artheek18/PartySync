import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function JoinRoom() {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTextFieldChange = (e) => {
    setRoomCode(e.target.value);
  };

  const roomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };

    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/room/${roomCode}`);
        } else {
          setError("Room not found.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Grid
        item
        style={{
          maxWidth: 350,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography component="h4" variant="h4" gutterBottom>
          Join A Room
        </Typography>
        <TextField
          error={!!error} // true if error message exists
          label="Code"
          placeholder="Enter Room Code"
          value={roomCode} // controlled input
          onChange={handleTextFieldChange}
          helperText={error}
          variant="outlined"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={roomButtonPressed}
          fullWidth
          sx={{ mt: 3 }}
        >
          Enter Room
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/"
          fullWidth
          sx={{ mt: 1 }}
        >
          Back
        </Button>
      </Grid>
    </Grid>
  );
}

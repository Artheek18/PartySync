import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";
import CreateRoom from "./CreateRoom";
import MusicPlayer from "./MusicPlayer";

export default function Room({ leaveRoomCallback }) {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [spotifyAuth, setSpotifyAuth] = useState(false);
  const [song, setSong] = useState(null);

  const getRoomDetails = async () => {
    try {
      const response = await fetch(`/api/get-room?code=${roomCode}`);
      if (!response.ok) {
        leaveRoomCallback();
        navigate("/");
        return;
      }
      const data = await response.json();
      setVotesToSkip(data.votes_to_skip);
      setGuestCanPause(data.guest_can_pause);
      setIsHost(data.is_host);
      if (data.is_host) {
        authenticateSpotify();
      }
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  const authenticateSpotify = async () => {
    try {
      const response = await fetch("/spotify/is-authenticated/");
      const data = await response.json();
      setSpotifyAuth(data.status);

      if (!data.status) {
        const authResponse = await fetch("/spotify/get-auth-url/");
        const authData = await authResponse.json();
        window.location.replace(authData.url);
      }
    } catch (error) {
      console.error("Spotify auth error:", error);
    }
  };

  const getCurrentSong = async () => {
    try {
      const response = await fetch("/spotify/current-song");
      if (!response.ok) {
        setSong(null);
      } else {
        const data = await response.json();
        setSong(data);
      }
    } catch (error) {
      console.error("Error fetching current song:", error);
    }
  };

  useEffect(() => {
    getRoomDetails();
  }, []);

  useEffect(() => {
    if (!spotifyAuth) return;
    const interval = setInterval(getCurrentSong, 1000);
    return () => clearInterval(interval);
  }, [spotifyAuth]);

  const leaveButtonPressed = async () => {
    try {
      await fetch("/api/leave-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      leaveRoomCallback();
      navigate("/");
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  };

  const updateShowSettings = (value) => {
    setShowSettings(value);
  };

  if (showSettings) {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoom
            update={true}
            votesToSkip={votesToSkip}
            guestCanPause={guestCanPause.toString()}
            roomCode={roomCode}
            updateCallback={() => {
              getRoomDetails();
              updateShowSettings(false);
            }}
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", transform: "translateY(-100px)" }}
    >
      {song ? (
        <>
          <Grid item xs={12} align="center">
            <Typography variant="h4">Code: {roomCode}</Typography>
          </Grid>
          <Grid item xs={12}>
            <MusicPlayer {...song} />
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12} align="center">
            <Typography variant="h4">Code: {roomCode}</Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h6">Votes: {votesToSkip}</Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h6">
              Guest Can Pause: {guestCanPause.toString()}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h6">Host: {isHost.toString()}</Typography>
          </Grid>
        </>
      )}

      {isHost && (
        <Grid item xs={12} align="center">
          <Button variant="contained" onClick={() => updateShowSettings(true)}>
            Settings
          </Button>
        </Grid>
      )}

      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}

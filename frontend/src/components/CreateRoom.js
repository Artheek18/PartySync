import React, { useState } from "react";
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link } from "react-router-dom";


function CreateRoom() {
    const [guestCanPause, setGuestCanPause] = useState("true");
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleGuestCanPauseChange = (event) => {
        setGuestCanPause(event.target.value);
    };

    const handleVotesChange = (event) => {
        setVotesToSkip(event.target.value);
    };

    // Mock function to simulate an API call
    async function createRoomApi(data) {
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.votesToSkip < 1) {
            reject(new Error("Votes to skip must be at least 1"));
            } else {
            resolve({ roomCode: "ABCD1234" }); // example response
            }
        }, 1000);
        });
    }

    const handleRoomButtonPressed = async () => {
  setLoading(true);
  setErrorMsg("");
  setSuccessMsg("");

    try {
        const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            guest_can_pause: guestCanPause === "true", // snake_case (Django expects this)
            vote_to_skip: Number(votesToSkip),         // snake_case (Django expects this)
        }),
        };

        const response = await fetch('/api/create-room', requestOptions); // 🔄 await fetch() properly here

        const data = await response.json(); // read response body

        console.log("Response JSON:", data); 

        if (!response.ok) {
        throw new Error("Server responded with an error!");
        }

        setSuccessMsg(`Room created! Your room code: ${data.code || "Unknown"}`);
    } catch (error) {
        setErrorMsg(error.message || "Failed to create room");
    } finally {
        setLoading(false);
    }
    };

    return (
        <Grid
        container
        justifyContent="center"
        alignItems="center"  // ← this vertically centers
        style={{
            width: "100vw",      // full viewport width
            height: "100vh"
            //padding: 16,
            //marginTop: 130,
        }}
        >
        {/* The item Grid has fixed maxWidth and 100% width for inputs inside */}
        <Grid
            item
            style={{
            maxWidth: 350,
            width: "100%",
            textAlign: "center",
            }}
        >
            <Typography component="h4" variant="h4" gutterBottom>
            Create A Room
            </Typography>

            <FormControl component="fieldset" style={{ width: "100%" }}>
            <FormHelperText style={{ marginBottom: 8 , textAlign: "center"}}>
                Guest Control of Playback State
            </FormHelperText>
            <RadioGroup
                row
                value={guestCanPause}
                onChange={handleGuestCanPauseChange}
                style={{ justifyContent: "center" }}
            >
                <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
                />
                <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
                />
            </RadioGroup>
            </FormControl>

            <FormControl style={{ width: "100%", marginTop: 16 }}>
            <TextField
                required
                type="number"
                onChange={handleVotesChange}
                value={votesToSkip}
                inputProps={{ min: 1, style: { textAlign: "center" } }}
                disabled={loading}
                fullWidth
            />
            <FormHelperText style={{textAlign: "center"}}>Votes Required To Skip Song</FormHelperText>
            </FormControl>

            {errorMsg && (
            <Typography color="error" sx={{ mt: 2 }}>
                {errorMsg}
            </Typography>
            )}
            {successMsg && (
            <Typography color="success.main" sx={{ mt: 2 }}>
                {successMsg}
            </Typography>
            )}

            <Button
            variant="contained"
            color="primary"
            onClick={handleRoomButtonPressed}
            disabled={loading}
            fullWidth
            sx={{ mt: 3 }}
            >
            {loading ? "Creating..." : "Create A Room"}
            </Button>

            <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/"
            disabled={loading}
            fullWidth
            sx={{ mt: 1 }}
            >
            Back
            </Button>
        </Grid>
        </Grid>
    );
}
export default CreateRoom;
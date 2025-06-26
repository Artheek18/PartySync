import React, { useState } from "react";
import {
    Button,
    Grid,
    TextField,
    Typography,
    FormControl,
    FormHelperText,
    Radio,
    RadioGroup,
    FormControlLabel,
    Collapse,
    Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function CreateRoom({
    update = false,
    votesToSkip = 2,
    guestCanPause = "true",
    roomCode = null,
    updateCallback = () => {},
}) {
    const [guestCanPauseState, setGuestCanPauseState] = useState(guestCanPause);
    const [votesToSkipState, setVotesToSkipState] = useState(votesToSkip);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate();

    const handleGuestCanPauseChange = (event) => {
        setGuestCanPauseState(event.target.value);
    };

    const handleVotesChange = (event) => {
        setVotesToSkipState(event.target.value);
    };

    const handleRoomButtonPressed = async () => {
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        try {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    guest_can_pause: guestCanPauseState === "true",
                    votes_to_skip: Number(votesToSkipState),
                }),
            };

            const response = await fetch('/api/create-room', requestOptions);
            const data = await response.json();

            if (!response.ok) {
                throw new Error("Server responded with an error!");
            }

            setSuccessMsg(`Room created! Your room code: ${data.code || "Unknown"}`);
            updateCallback(); 
        } catch (error) {
            setErrorMsg(error.message || "Failed to create room");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateButtonPressed = async () => {
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        try {
            const requestOptions = {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    guest_can_pause: guestCanPauseState === "true",
                    votes_to_skip: Number(votesToSkipState),
                    code: roomCode,
                }),
            };

            const response = await fetch('/api/update-room', requestOptions);
            await response.json();

            if (!response.ok) {
                throw new Error("Server responded with an error!");
            }

            setSuccessMsg("Room updated successfully!");
        } catch (error) {
            setErrorMsg(error.message || "Failed to update room");
        } finally {
            setLoading(false);
        }
    };

    const title = update ? "Update Room" : "Create A Room";

    const renderCreateButtons = () => (
        <>
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
        </>
    );

    const renderUpdateButtons = () => (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateButtonPressed}
                disabled={loading}
                fullWidth
                sx={{ mt: 3 }}
            >
                {loading ? "Updating..." : "Update Room"}
            </Button>

            <Button
                variant="contained"
                color="secondary"
                onClick={updateCallback} 
                disabled={loading}
                fullWidth
                sx={{ mt: 1 }}
            >
                Close
            </Button>
        </>
    );

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ width: "100vw", height: "100vh" }}
        >
            <Grid item style={{ maxWidth: 350, width: "100%", textAlign: "center" }}>
                <Typography component="h4" variant="h4" gutterBottom>
                    {title}
                </Typography>

                <Collapse in={errorMsg !== "" || successMsg !== ""} sx={{ mt: 2 }}>
                    {successMsg !== "" ? (
                        <Alert severity="success" onClose={() => setSuccessMsg("")}>
                            {successMsg}
                        </Alert>
                    ) : (
                        <Alert severity="error" onClose={() => setErrorMsg("")}>
                            {errorMsg}
                        </Alert>
                    )}
                </Collapse>

                <FormControl component="fieldset" style={{ width: "100%" }}>
                    <FormHelperText style={{ marginBottom: 8, textAlign: "center" }}>
                        Guest Control of Playback State
                    </FormHelperText>
                    <RadioGroup
                        row
                        value={guestCanPauseState}
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
                        value={votesToSkipState}
                        inputProps={{ min: 1, style: { textAlign: "center" } }}
                        disabled={loading}
                        fullWidth
                    />
                    <FormHelperText style={{ textAlign: "center" }}>
                        Votes Required To Skip Song
                    </FormHelperText>
                </FormControl>

                {update ? renderUpdateButtons() : renderCreateButtons()}
            </Grid>
        </Grid>
    );
}

export default CreateRoom;

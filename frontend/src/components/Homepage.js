import React, { useState, useEffect }  from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";



function Homepage() {

    const [roomCode, setRoomCode] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await fetch("/api/user-in-room");
                const data = await response.json();
                if (data.code) {
                    setRoomCode(data.code);
                    navigate(`/room/${data.code}`);
                }
            } catch (error) {
                console.error("Error fetching room code:", error);
            }
        };

        fetchRoom();
    }, [navigate]);

    return (
       /* <div>
            <h2>Welcome to the Music Room!</h2>
            <p>Join the party and vibe with your favorite tunes.</p>
            <Link to="/join">Join a Room</Link><br />
            <Link to="/create">Create a Room</Link>
            
        </div>*/
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant="h3" component="h3">
                    Welcome to the Music Room!
                </Typography>
                <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
                    Join the party and vibe with your favorite tunes.
                </Typography>
                <ButtonGroup variant="contained">
                    <Button
                        color="primary"
                        component={Link}
                        to="/join"
                    >
                        Join a Room
                    </Button>
                    <Button
                        color="secondary"
                        component={Link}
                        to="/create"
                    >
                        Create a Room
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
        
    );
}

export default Homepage;
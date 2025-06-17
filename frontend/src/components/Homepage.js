import React from "react";
import { Link } from "react-router-dom";




function Homepage() {
    return (
        <div>
            <h2>Welcome to the Music Room!</h2>
            <p>Join the party and vibe with your favorite tunes.</p>
            <Link to="/join">Join a Room</Link><br />
            <Link to="/create">Create a Room</Link>
            
        </div>
    );
}

export default Homepage;
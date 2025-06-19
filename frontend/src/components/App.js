import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Homepage from "./Homepage";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Room from "./Room";

function App(props) {
    //const [count, setCount] = useState(0);
    const [roomCode, setRoomCode] = useState(null);

    const clearRoomCode = () => {
        setRoomCode(null);
    };

    return (
        <div className="center">
           { /*<h1>TESTING REACT CODE with {props.name}</h1>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>*/}
            <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/create" element={<CreateRoom />} />
                <Route path="/join" element={<JoinRoom />} />
                <Route path="/room/:roomCode" element={<Room leaveRoomCallback={clearRoomCode} />} />
            </Routes>
        </Router>
        </div>
    );
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App name="Artheeck Shan" />);
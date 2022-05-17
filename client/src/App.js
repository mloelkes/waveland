import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import Player from "./components/Player";

function App() {
    const [trackUrl, setTrackUrl] = useState("");
    const [trackImage, setTrackImage] = useState("");
    const [trackName, setTrackName] = useState("");

    function handlePlayTrack(trackUrl, trackImage, trackName) {
        setTrackUrl(trackUrl);
        setTrackImage(trackImage);
        setTrackName(trackName);
    }

    return (
        <div className="App">
            <Navigation></Navigation>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/:name" element={<Profile handlePlayTrack={handlePlayTrack}/>} />
            </Routes>
            <Player trackUrl={trackUrl} trackImage={trackImage} trackName={trackName}></Player>
        </div>
    );
}

export default App;

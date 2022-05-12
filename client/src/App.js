import { Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
    </Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
    <Routes>
        <Route path='/' element={<Home />} />
    </Routes>
    </div>
  );
}

export default App;

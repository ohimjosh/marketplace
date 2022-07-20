import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Map from './components/Map';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/map" element={<Map />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;

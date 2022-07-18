import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapPage from "./components/MapPage";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

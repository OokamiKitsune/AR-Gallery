import "./App.css";
import Gallery from "./Gallery";
import AdminPanel from "./Admin/AdminPanel";
import ARView from "./AR/ARView";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/ar-view" element={<ARView />} />
    </Routes>
  );
}

export default App;

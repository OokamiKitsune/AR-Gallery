import "./App.css";
import Gallery from "./Gallery";
import AdminPanel from "./Admin/AdminPanel";
import ARView from "./AR/ARView";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NotFound from "./404";
import NabBar from "./components/NavBar/index";
import { SendSOLToRandomAddress } from "./components/Solana/solTest";

function App() {
  return (
    <>
      <NabBar />
      <SendSOLToRandomAddress />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/ar-view" element={<ARView />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

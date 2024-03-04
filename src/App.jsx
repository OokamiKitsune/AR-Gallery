import "./App.css";
import Gallery from "./Gallery";
import AdminPanel from "./Admin/AdminPanel";
import ARView from "./AR/ARView";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NotFound from "./404";
import NavBar from "./components/NavBar/index";
import { Provider } from "react-redux";
import store from "./reduxReducers/store/store";
import { useEffect, useState } from "react";

function App() {
  // Check user authentication status
  const [userData, setUserData] = useState(null);
  const [siteData, setSiteData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://192.168.50.243:5000/api/userdata");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("🔴 Error fetching user data: ", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const response = await fetch("http://192.168.50.243:5000/api/settings");
        const data = await response.json();
        setSiteData(data);
      } catch (error) {
        console.error("🔴 Error fetching site data: ", error);
      }
    };
    fetchSiteData();
  }, []);

  return (
    <>
      <Provider store={store}>
        <NavBar data={userData} />
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/ar-view" element={<ARView />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;

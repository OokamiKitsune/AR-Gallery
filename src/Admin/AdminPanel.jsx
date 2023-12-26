import imnotartlogo from "../assets/imnotartlogo.png";
import NabBar from "../components/NavBar/index";
import "../App.css";
import { useState } from "react";
import Upload from "../components/Upload";
import Login from "../components/Login";

const AdminPanel = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleUploadComplete = (uploadedImages) => {
    setUploadedImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  // Handle authentication/login
  // const handleLogin = async () => {
  //   fetch("/api/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email, password }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });

  //     if (error) {
  //       throw error;
  //     }

  //     if (user) {
  //       setLoggedIn(true);
  //       setEmail("");
  //       setPassword("");
  //       // Store the token in local storage
  //       // localStorage.setItem('token', user.access_token);
  //     }
  //   } catch (error) {
  //     alert("Invalid email or password 🤭");
  //     setPassword("");
  //   }

  //   // Test login REMOVE LATER
  //   if (email === "admin" && password === "password") {
  //     setLoggedIn(true);
  //     setEmail("");
  //     setPassword("");
  //   }
  // };

  // Demo code for adding a new art piece
  const artPieces = [
    {
      id: 1,
      name: "Art Piece 1",
      author: "Author 1",
      website: "https://www.google.com",
      imageUrl: "url_to_image_1",
      arEnabled: true,
    },
    {
      id: 2,
      name: "Art Piece 2",
      author: "Author 2",
      website: "https://www.google.com",
      imageUrl: "url_to_image_2",
      arEnabled: false,
    },
    // Add more art pieces here...
  ];

  return (
    <>
      <NabBar />
      {/* Add a condition to render the Admin Panel content if logged in */}
      {loggedIn ? (
        <div>
          {/* Logout button */}
          <button onClick={() => setLoggedIn(false)}>Logout</button>
          <h2>AR Gallery Management</h2>
          <div className="card">
            {/* Render uploaded images */}
            {uploadedImages.map((image) => (
              <div key={image.id} className="thumbnail-card">
                <p>{image.name}</p>
                <img src={image.imageUrl} alt={image.name} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Render the Login component if not logged in
        <Login />
      )}
      {/* Pass handleUploadComplete function to the Upload component */}
      <Upload onUploadComplete={handleUploadComplete} />
    </>
  );
};

export default AdminPanel;

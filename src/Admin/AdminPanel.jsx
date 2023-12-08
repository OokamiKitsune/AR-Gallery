import imnotartlogo from "../assets/imnotartlogo.png";
import "../App.css";
import { useState } from "react";
import Upload from "./Upload";

const AdminPanel = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle authentication/login
  const handleLogin = async () => {
    fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    try {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }

      if (user) {
        setLoggedIn(true);
        setEmail("");
        setPassword("");
        // Store the token in local storage
        // localStorage.setItem('token', user.access_token);
      }
    } catch (error) {
      alert("Invalid email or password 🤭");
      setPassword("");
    }

    // Test login REMOVE LATER
    if (email === "admin" && password === "password") {
      setLoggedIn(true);
      setEmail("");
      setPassword("");
    }
  };

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
      <div>
        <img src={imnotartlogo} className="logo" alt="imnotArtLogo" />
      </div>
      {!loggedIn ? (
        <div>
          <h2>AR Gallery Login</h2>
          <div className="login-container">
            <input
              type="text"
              id="email"
              required="true"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br></br>
          <div className="login-container">
            <input
              type="password"
              placeholder="Password"
              id="password"
              required="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-button">
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => setLoggedIn(false)}>Logout</button>
          <h2>AR Gallery Management</h2>
          <div className="card">
            <button onClick={() => addNewPiece()}>Upload New</button>
            <Upload />
            {artPieces.map((piece) => (
              <div key={piece.id} className="thumbnail-card">
                <p>
                  {piece.name} By: {piece.author}
                </p>
                <p>Id: {piece.id}</p>
                <br></br>
                <img src={piece.imageUrl} alt={piece.name} />
                <br></br>
                <div className="edit-buttons">
                  {piece.arEnabled ? (
                    <button
                      onClick={() => history.push(`/ar-view/${piece.id}`)}
                    >
                      View in AR
                    </button>
                  ) : (
                    <button disabled>AR not setup</button>
                  )}
                  <button
                    onClick={() => history.push(`/edit-art-piece/${piece.id}`)}
                  >
                    Edit
                  </button>
                  <button onClick={() => deletePiece(piece.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;

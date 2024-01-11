import imnotartlogo from "./assets/imnotartlogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom"; // Import useHistory

// To-do: Call backend API to get the images from the database

// const SUPABASE_URL = process.env.REACT_APP_DATABASE_URL;

// const SUPABASE_KEY = process.env.REACT_APP_SECRET_API_KEY;

// Gallery loads all images from storage bucket and displays them.

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [siteName, setSiteName] = useState("AR Gallery");
  const navigate = useNavigate(); // Create history object

  useEffect(() => {
    console.log("inside useEffect");
    const getImages = async () => {
      try {
        const response = await fetch("http://192.168.50.243:5000/api/images"); // Fetch images from backend API
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data
        setImages(data.images || []); // Set the fetched images in state
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    getImages();
  }, []);

  return (
    <>
      <div>
        <img src={imnotartlogo} className="logo" alt="imnotArtLogo" />
      </div>
      <h2>Augmented Reality Gallery</h2>
      <p>Enhanced experiance in art viewing.</p>
      <div className="gallery">
        {images.map((piece) => (
          <div key={piece.id} className="thumbnail-card">
            <img src={piece.imageUrl} alt={piece.name} />
            <div className="social-links">
              <a href={piece.website} target="_blank" rel="noopener noreferrer">
                {/* Replace the following image tag with your social media icons */}
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              {/* Add more social media icons as needed */}
            </div>
            <div className="info">
              <p>
                <b>{piece.name}</b>
                <br />
                By: {piece.author}
              </p>
              {piece.arEnabled ? (
                <button onClick={() => navigate(`/ar-view/${piece.id}`)}>
                  View in AR
                </button>
              ) : (
                <button disabled>AR not available</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Gallery;

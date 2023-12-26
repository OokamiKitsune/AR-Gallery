import imnotartlogo from "./assets/imnotartlogo.png";
import NabBar from "./components/NavBar/index";
import { corsHeaders } from "./cors.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom"; // Import useHistory

// To-do: Call backend API to get the images from the database

// const SUPABASE_URL = process.env.REACT_APP_DATABASE_URL;

// const SUPABASE_KEY = process.env.REACT_APP_SECRET_API_KEY;

// Gallery loads all images from storage bucket and displays them.

const Gallery = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate(); // Create history object
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  useEffect(() => {
    const getImages = async () => {
      const fetchedImages = await fetchImages();
      setImages(fetchedImages);
    };
    getImages();
  }, []);
  // Function to fetch all images from the bucket
  const fetchImagesFromBucket = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("images") // Replace 'YOUR_BUCKET_NAME' with your bucket name
        .list("test/");

      if (error) {
        console.error("Error fetching images:", error);
        return [];
      }

      // Construct URLs for the images in the 'test' directory
      const images = data.map((file) => ({
        id: file.id,
        name: file.name,
        imageUrl: `https://hxsxzqopqnktoldqenle.supabase.co/storage/v1/object/public/images/test/${file.name}`,
        // Add other necessary details
      }));

      return images || [];

      // 'data' contains information about all the files in the bucket
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  };

  // Usage example
  const fetchImages = async () => {
    const images = await fetchImagesFromBucket();
    console.log("Images in the bucket:", images);
    return images;
  };

  return (
    <>
      <div>
        <NabBar />
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

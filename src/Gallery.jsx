import imnotartlogo from "./assets/imnotartlogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom"; // Import useHistory
import { connect } from "react-redux"; // Import connect from react-redux
import { setImages } from "./reduxReducers/actions/imageActions"; // Import the action creator
import PropTypes from "prop-types"; // Import PropTypes

// const SUPABASE_URL = process.env.REACT_APP_DATABASE_URL;

// const SUPABASE_KEY = process.env.REACT_APP_SECRET_API_KEY;

const site = {
  name: "NativeVerse",
  logo: imnotartlogo,
  description: "A collection of AR-enabled art pieces",
};

const Gallery = ({ images, setImages }) => {
  // const [images, setImages] = useState([]);
  const navigate = useNavigate(); // Create history object

  useEffect(() => {
    console.log("inside useEffect");
    const getImages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/images"); // Fetch images from backend API
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
  }, [setImages]);
  // Define PropTypes for the component
  Gallery.propTypes = {
    images: PropTypes.array.isRequired, // images should be an array and is required
    setImages: PropTypes.func.isRequired, // setImages should be a function and is required
  };

  return (
    <>
      <div>
        <img src={site.logo} className="logo" alt={site.name} />
      </div>
      <h2>{site.name}</h2>
      {/* Add a description of the gallery */}
      <p>{site.description}</p>
      <div className="gallery">
        {images.map((piece) => (
          <div key={piece.id} className="thumbnail-card">
            <img src={piece.imageUrl} alt={piece.name} />
            <div className="social-links">
              <a href={piece.website} target="_blank" rel="noopener noreferrer">
                {/* Replace the following image tag with your social media icons */}
                <FontAwesomeIcon icon={faTwitter} />
                <FontAwesomeIcon icon={faFacebook} />
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

const mapStateToProps = (state) => ({
  images: state.images.images,
});

const mapDispatchToProps = {
  setImages,
};

const GalleryConnected = connect(mapStateToProps, mapDispatchToProps)(Gallery);
export default GalleryConnected;

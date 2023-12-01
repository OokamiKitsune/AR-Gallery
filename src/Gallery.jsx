import imnotartlogo from './assets/imnotartlogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import './App.css'
import { useNavigate } from 'react-router-dom'; // Import useHistory


const Gallery = () => {
    const navigate = useNavigate(); // Create history object
    // Demo code for adding a new art piece
    const artPieces = [
        {
            id: 1,
            name: 'Seagals',
            author: 'Coal Field Hotel',
            website: 'https://www.google.com',
            imageUrl: '/Seagals.JPEG',
            arEnabled: true,
            viewable: true,
        },
        {
            id: 2,
            name: 'Art Piece 2',
            author: 'Author 2',
            website: 'https://www.google.com',
            imageUrl: '/tenor.gif',
            arEnabled: true,
        },
        {
            id: 2,
            name: 'Art Piece 2',
            author: 'Author 2',
            website: 'https://www.google.com',
            imageUrl: '/2.jpg',
            arEnabled: false,
        },
        {
            id: 2,
            name: 'Art Piece 2',
            author: 'Author 2',
            website: 'https://www.google.com',
            imageUrl: 'url_to_image_2',
            arEnabled: false,
        },
        // Add more art pieces here...
    ];

    return (
        <>
            <div>
                <img src={imnotartlogo} className="logo" alt="imnotArtLogo" />
            </div>
            <h2>Augmented Reality Gallery</h2>
            <p>Enhanced experiance in art viewing.</p>
            <div className="gallery">
  {artPieces.map((piece) => (
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
        <p><b>{piece.name}</b><br />By: {piece.author}</p>
        {piece.arEnabled ? (
          <button onClick={() => navigate(`/ar-view/${piece.id}`)}>
            View in AR
          </button>
        ) : (
          <button disabled>
            AR not available
          </button>
        )}
      </div>
    </div>
  ))}
</div>
            
        </>
    );
}

export default Gallery;
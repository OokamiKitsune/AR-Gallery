import imnotartlogo from '../assets/imnotartlogo.png'
import '../App.css'
import { useState } from 'react';
import { env }  from 'process';
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = env.DATABASE_URL
const supabaseKey = env.PUBLIC_API_KEY
// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey)


const AdminPanel = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Add login logic here...
        if (username === 'admin' && password === 'password') {
            setLoggedIn(true);
            setUsername('');
            setPassword('');
        } else {
            alert('Invalid username or password');
            setUsername('');
            setPassword('');
        }
    }

    const artPieces = [
        {
            id: 1,
            name: 'Art Piece 1',
            author: 'Author 1',
            website: 'https://www.google.com',
            imageUrl: 'url_to_image_1',
            arEnabled: true,
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
            {!loggedIn ? (
                <div>
                    <h2>AR Gallery Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br>
                    </br>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br>
                    </br>
                    <br>
                    </br>
                    <button onClick={handleLogin}>Login</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => setLoggedIn(false)}>Logout</button>
                    <h2>AR Gallery Management</h2>
                    
            <div className="card">
            <button onClick={() => addNewPiece()}>Upload New</button>
                {artPieces.map((piece) => (
                    <div key={piece.id} className="thumbnail-card">
                        <p>{piece.name} By: {piece.author}</p>
                        <p>Id: {piece.id}</p>
                        <br>
                        </br>
                        <img src={piece.imageUrl} alt={piece.name} />
                        <br>
                        </br>
                    <div className="edit-buttons">
                        {piece.arEnabled ? (
                            <button onClick={() => history.push(`/ar-view/${piece.id}`)}>
                                View in AR
                            </button>
                        ) : (
                            <button disabled>
                                AR not setup
                            </button>
                        )}
                        <button onClick={() => history.push(`/edit-art-piece/${piece.id}`)}>
                            Edit
                        </button>
                        <button onClick={() => deletePiece(piece.id)}>
                            Delete
                        </button>
                        </div>      
                    </div>              
                ))}
            </div>

            
                </div>
        
            )}

        </>
    );
}

export default AdminPanel;
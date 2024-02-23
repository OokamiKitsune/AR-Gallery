# Vishuvl Backend API Documentation

Vishuvl comes with its own fully functioning backend API that is capable of handing all backend requests to
database and processing AR feature sets.

### NFT Marker Creator

The NFT Marker Creator Implementation is a custom Serverside implementation of the original NFT-Maker-Creator by Carnaux. It handles all requests to generate feature sets aka as image descriptors. Using WASM and Emscripten, this process can
quickly generate the 3 required files that allow a AR enabled application to display overlays and other AR content.

### Server.js

Server.js is the backend API that handles all requests to and from the backend database as well as calling the custom NFT Marker Creator API.

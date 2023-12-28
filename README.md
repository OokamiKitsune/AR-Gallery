# AR Gallery


- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)
  uses [SWC](https://swc.rs/) for Fast Refresh


# Set-up


AR Gallery is more than just a for AR. I have designed this application to accommodate basic image uploading, tagging, user account creation, and moderation, as well as other CMS and social features with a custom backend API. AR Gallery uses a comprehensive tech stack. At the minimum, you will need to install Vite, React, Node.js and Yarn

- Vite (Vite + React) - https://vitejs.dev/

- Node.js - https://nodejs.org

- React - https://react.dev

- Yarn - https://yarnpkg.com/

- Express.js - https://expressjs.com/

- Bootstrap - https://getbootstrap.com/docs/5.3/getting-started/introduction/

- Uppy - https://uppy.io

- AR.js - https://ar-js-org.github.io/AR.js-Docs/
- Three.js - https://threejs.org/ (NYI)

- Supabase - https://supabase.com

- Solana (NYI) - https://solana.com

# Installing Dependencies

AR Gallery is a mono repo. The server and the front end are both within the root directory. To install all dependencies, you will need to run yarn install in both the app's root directory and also in the server directory. 

Install VITE frontend using Yarn

This app has been designed around using the Yarn Package Manager. You will need Yarn.

Change the directory to the root of the application

cd ar-gallery

Install dependencies using Yarn. (Do not use NPM as this could cause potential conflicts)

yarn install

Run the VITE server using the --host flag. This allows the app to accept other network connections (Useful for testing on mobile devices on the same network for dev purposes)

yarn run dev --host



Security check

AR.js needs access to a device's camera, so HTTPS must be set up in order for the AR features to work. 

Install backend Express.js server

The backend is built with Express.js and has endpoints setup out of the box. 

Change the directory to the server dir.

cd server/

Run yarn install

yarn install

Run the backend server

node server.js

The backend has a default CORS policy set. You might need to make some changes to the CORS policy to ensure that you can allow requests from the frontend URL and not get a CORS block error.

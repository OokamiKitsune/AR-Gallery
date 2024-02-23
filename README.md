# AR Gallery

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Contributing

If you are contributing to the codebase please know this:

- All issues are created within Jira and branched off the dev branch. If you see a branch prefixed with "AG-#", this is the issue key within Jira that identifies that particular feature or bug fix.
- While we adhere to and manage main branch features within Jira, you are free to add features or fixes outside the Jira environment within GitHub. Please only fork and work on the dev branch.
- When you contribute: Fork and clone the dev branch > Make your changes then push to dev.

## Set-up

AR Gallery is more than just for AR. I have designed this application to accommodate basic image uploading, tagging, user account creation, and moderation, as well as other CMS and social features with a custom backend API. AR Gallery uses a comprehensive tech stack. At the minimum, you will need to install Vite, React, Node.js, and Yarn.

- [Vite (Vite + React)](https://vitejs.dev/)
- [Node.js](https://nodejs.org)
- [React](https://react.dev)
- [Yarn](https://yarnpkg.com/)
- [Express.js](https://expressjs.com/)
- [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [Uppy](https://uppy.io)
- [AR.js](https://ar-js-org.github.io/AR.js-Docs/)
- [Three.js](https://threejs.org/) (NYI)
- [Supabase](https://supabase.com)
- [Solana](https://solana.com) (NYI)

# Installing Dependencies

AR Gallery is a mono repo, meaning the server and the front end are both within the root directory. To install all dependencies, follow these steps:

1. **Install VITE frontend using Yarn:**

   - This app is designed around the Yarn Package Manager. Make sure you have Yarn installed.
   - Change the directory to the root of the application:
     ```bash
     cd ar-gallery
     ```
   - Install dependencies using Yarn. (Avoid using NPM to prevent potential conflicts)
     ```bash
     yarn install
     ```
   - Run the VITE server using the `--host` flag to allow the app to accept other network connections (useful for testing on mobile devices on the same network for dev purposes):
     ```bash
     yarn run dev --host
     ```

2. **Security Check:**

   - AR.js requires access to a device's camera, so HTTPS must be set up for the AR features to work.

3. **Install backend Express.js server:**

   - The backend is built with Express.js and has endpoints set up out of the box.
   - Change the directory to the server dir:
     ```bash
     cd server/
     ```
   - Run yarn install:
     ```bash
     yarn install
     ```
   - Run the backend server:
     ```bash
     node server.js
     ```
   - The backend has a default CORS policy set. You might need to make some changes to the CORS policy to ensure that you can allow requests from the frontend URL and not get a CORS block error.

4. **SSL setup:**
   - Both the frontend and backend need HTTPS to test/use AR.js. The backend also needs to be set up for HTTPS.
   - You can generate your own self-signed cert using:
     ```bash
     openssl x509 -noout -text -in server.cert
     openssl rsa -noout -text -in server.key
     ```

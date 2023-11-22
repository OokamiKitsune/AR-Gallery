# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and
some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)
  uses [SWC](https://swc.rs/) for Fast Refresh
-

# AR

Using libs:

- AR.js - https://ar-js-org.github.io/AR.js-Docs/
- Three.js - https://threejs.org/ (NYI)

# Set-up

Basic setup with Yarn. AR libraries access the camera on devices so a Secure
HTTP connection maybe required if the browser cannot access the camera.

- cd to project root
- yarn install
- yarn run dev --host

const path = require("path");
const fs = require("fs");
const glob = require("glob");
const readlineSync = require("readline-sync");
const inkjet = require("inkjet");
const im = require("imagemagick");
const PNG = require("pngjs").PNG;
const axios = require("axios");
var artoolkit_wasm_url = "./libs/NftMarkerCreator_wasm.wasm";
var Module = require("./libs/NftMarkerCreator_wasm.js");
const e = require("express");

// Check if WASM module is loaded
if (typeof Module !== "undefined") {
  console.log("Wasm module loaded. ✅ ");

  // Assign locateFile function
  Module.locateFile = function (url) {
    if (url.endsWith(".wasm")) {
      return artoolkit_wasm_url;
    }
    return url;
  };

  // Check for loaded functions
  if (typeof Module.locateFile === "function") {
    console.log("Wasm functions loaded. ✅ ");

    // Script to process the image with the WASM module
  } else {
    console.error("Wasm functions not loaded.❗️");
  }
} else {
  console.error("Wasm module not loaded.");
}

const imageURL =
  "https://hxsxzqopqnktoldqenle.supabase.co/storage/v1/object/public/images/test/alpha%20wolf%202145_0ccf0772-2855-4c3a-9606-3085d6ea6d6e.jpg";

fetchImageFromURL(imageURL);
// Get image from URL
async function fetchImageFromURL(imageURL) {
  try {
    const response = await axios.get(imageURL, { responseType: "arraybuffer" });
    // Process the image

    // console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 404) {
      console.error("Image not found");
    } else {
      throw new Error("Error fetching image from URL");
    }
  }
}

// Pass the image buffer to the processor
const imageData = fetchImageFromURL(imageURL);

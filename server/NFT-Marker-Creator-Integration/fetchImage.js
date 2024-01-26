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
  console.log("🟢 Wasm module loaded.\n");

  // Defense mechanism; Add functions here to check if they are loaded.
  const wasmModulesFunctions = {
    locateFile: false,
    onRuntimeInitialized: false,
    warnOnce: false,
  };

  Module.locateFile = function (url) {
    if (url.endsWith(".wasm")) {
      return artoolkit_wasm_url;
    }
    return url;
  };

  // Check and update the status for loaded functions
  for (const funcName in wasmModulesFunctions) {
    if (typeof Module[funcName] === "function") {
      wasmModulesFunctions[funcName] = true;
      console.log(`🟢 Function ${funcName} loaded. \n`);
    } else {
      console.error(`🔴 >>>>>> Function ${funcName} not loaded. <<<<<< \n`);
    }
  }

  // Begin the image descriptor generator process and call the processImage function
  console.log("🚀 Starting image descriptor generator process...\n");
  processImage();
} else {
  console.error(
    "🔴 Wasm module(s) not loaded. Cannot process image. Terminating 😔\n"
  );
}

// Fetch image from URL as Array Buffer

async function processImage() {
  const imageURL =
    "https://hxsxzqopqnktoldqenle.supabase.co/storage/v1/object/public/images/test/alpha%20wolf%202145_0ccf0772-2855-4c3a-9606-3085d6ea6d6e.jpg";

  try {
    const imageBuffer = await fetchImageArrayBuffer(imageURL);
    // Now imageBuffer contains the array buffer, and you can use it in your decodeJPG function or any other processing logic.
    if (imageBuffer) {
      // Wait for the image to be decoded
      await decodeJPG(imageBuffer);
      // Continue with other processing steps
    }
  } catch (error) {
    console.error(error);
  }
}
// Fetch image from URL as Array Buffer
async function fetchImageArrayBuffer(imageURL) {
  try {
    const response = await axios.get(imageURL, { responseType: "arraybuffer" });
    console.log(response);
    return response.data; // Return the array buffer directly
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 404) {
      console.error("Image not found");
    } else {
      throw new Error("Error fetching image from URL");
    }
  }
}

// Decode JPG images
async function decodeJPG(imageBuffer) {
  return new Promise((resolve, reject) => {
    inkjet.decode(imageBuffer, function (err, decodedImage) {
      if (err) {
        console.log("🔴 Error decoding image: ", err);
        reject(err);
      } else {
        console.log("🟢 Image decoded successfully");
        // Process the image
        console.log(decodedImage);
        resolve(decodedImage);
      }
    });
  });
}

const axios = require("axios");
const imageURL =
  "https://hxsxzqopqnktoldqenle.supabase.co/storage/v1/object/public/images/test/alpha%20wolf%202145_0ccf0772-2855-4c3a-9606-3085d6ea6d6e.jpg";

fetchImageFromURL(imageURL);
// Get image from URL
async function fetchImageFromURL(imageURL) {
  try {
    const response = await axios.get(imageURL, { responseType: "arraybuffer" });
    // Process the image
    console.log(response);
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

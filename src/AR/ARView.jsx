import "aframe";
import "ar.js";
import { Entity, Scene } from "aframe-react";
import { useState, useEffect } from "react";
import axios from "axios";

const ARView = () => {
  // Get the image, its model and metadata from the backend API
  const [arImageURL, setARImageURL] = useState([]);
  const [gltfModel, setGltfModel] = useState([]);

  useEffect(() => {
    // Fetch AR data from backend API
    axios
      .get("/api/get-ar-image/${imageId}")
      .then((response) => {
        // Extract image URL and model from the response
        const { data } = response.data;
        const { imageURL, model } = data;

        // Update state with fetched data
        setARImageURL(imageURL);
        setGltfModel(model);
      })
      .catch((error) => {
        // Handle errors if any
        console.error("Error fetching AR data:", error);
      });
  }, []);

  return (
    <Scene
      embedded
      arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: true;"
    >
      <a-nft
        type="nft"
        url={arImageURL}
        smooth="true"
        smoothCount="10"
        smoothTolerance=".01"
        smoothThreshold="5"
      >
        <Entity gltf-model={gltfModel} scale="10 10 10" position="50 50 50" />
      </a-nft>
      <Entity camera />
    </Scene>
  );
};

export default ARView;

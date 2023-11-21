import 'aframe';
import 'ar.js'
import { Entity, Scene } from 'aframe-react';


const ARTest = () => {
  return (
    
    <Scene embedded arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: true;">
      <a-nft type="nft" url="./output/Seagals" smooth="true" smoothCount="10"
        smoothTolerance=".01" smoothThreshold="5">
        <Entity gltf-model="./Flamingo.glb" scale="10 10 10" position="50 50 50" />
      </a-nft>
      <Entity camera />
    </Scene>
  );
};

export default ARTest;

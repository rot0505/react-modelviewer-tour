import * as THREE from 'three';
const scene = new THREE.Scene();
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const App = () => {
  const loader = new GLTFLoader();

  loader.load('assets/models/window.glb', function (gltf) {

    scene.add(gltf.scene);

  }, undefined, function (error) {

    console.error(error);

  });
}

export default App;
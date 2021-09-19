import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useRef } from 'react';
import * as THREE from 'three';

function App() {

  var camera, scene, renderer;
  var car;
  var gltf_loader = new GLTFLoader();
  var model = require("./assets/models/color-window.glb").default;

  init();

  function init() {
    const container = document.createElement("div");
    document.body.appendChild(container);
    // ------------------------------------ *** ---------------------------------------

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(40, 20, 30);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;

    container.appendChild(renderer.domElement);

    // LOAD MODEL
    gltf_loader.load(model, function (gltf) {
      car = gltf.scene;
      gltf.scene.scale.set(0.1, 0.1, 0.1);
      // scene.add(gltf.scene);

      render();
    });

    var light = new THREE.PointLight(0xffffff, 2);
    light.position.set(100, 100, 100);
    scene.add(light);

    // LOAD TEXTURE
    // const rgbe_loader = new RGBELoader();

    // rgbe_loader.setDataType(THREE.UnsignedByteType);
    // rgbe_loader.load("hdr/background.hdr", function (texture) {
    //   const pmremGenerator = new THREE.PMREMGenerator(renderer);
    //   const envMap = pmremGenerator.fromEquirectangular(texture).texture;

    //   scene.background = envMap;
    //   scene.environment = envMap;

    //   render();
    // });

    // VIEW CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", render);
    controls.minDistance = 20;
    controls.maxDistance = 70;
    controls.target.set(0, 0.5, 0);
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.ROTATE,
    };
    // controls.minPolarAngle = 0;
    // controls.maxPolarAngle = Math.PI / 2;
    controls.update();

    window.addEventListener("resize", onWindowResize, false);
  }

  function loadModel(modelPath, x = 0.1, y = 0.1, z = 0.1) {
    gltf_loader.load(modelPath, function (gltf) {
      scene.remove(car);
      car = gltf.scene;
      gltf.scene.scale.set(x, y, z);
      scene.add(car);
      render();
    });
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  }

  function render() {
    renderer.render(scene, camera);
  }

  return (
    <div>

    </div>
  )
}

export default App;
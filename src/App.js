import React, { Suspense, useState } from 'react'
import { Canvas } from 'react-three-fiber'
import { Html, Loader, OrbitControls } from '@react-three/drei'
// import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'

import Color from './Color'
// import Model from './Model'
import White from './White'

const windowColors = ['black', 'red', 'green']
const wallColors = ['grey', 'yellow', 'lightgreen']

export default function App() {
  const [width, setWidth] = useState(1)
  const [depth, setDepth] = useState(1)
  const [height, setHeight] = useState(1)
  const [showWindow, setShowWindow] = useState(true)
  const [showWall, setShowWall] = useState(true)
  const [currentModel, setCurrentModel] = useState(true)
  const [indexWindowColor, setIndexWindowColor] = useState(0)
  const [indexWallColor, setIndexWallColor] = useState(0)

  const changeWidth = (e) => {
    setWidth(e.target.value / 300)
  }

  const changeDepth = (e) => {
    setDepth(e.target.value / 10)
  }

  const changeHeight = (e) => {
    setHeight(e.target.value / 300)
  }

  const changeWindowColor = () => {
    const index = (indexWindowColor + 1) % 3
    setIndexWindowColor(index)
  }

  const changeWallColor = () => {
    const index = (indexWallColor + 1) % 3
    setIndexWallColor(index)
  }
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ width: '85%' }}>
        <Canvas
          concurrent
          gl={{ alpha: false }}
          camera={{ position: [0, 15, 30], fov: 70 }}
          onCreated={({ gl, camera }) => {
            camera.lookAt(0, 0, 0)
          }}>
          <color attach="background" args={['#fff']} />
          <ambientLight intensity={5} />

          <Suspense
            fallback={
              <Html center>
                <Loader />
              </Html>
            }>
            {currentModel && <White position={[10, 0, 0]} scaleWindow={[width, depth, height]} showWindow={showWindow} showWall={showWall} windowColor={windowColors[indexWindowColor]} wallColor={wallColors[indexWallColor]} />}
            {!currentModel && <Color position={[10, 0, 0]} />}
            <OrbitControls />
          </Suspense>
        </Canvas>
      </div>
      <div style={{ width: '15%', padding: '100px 20px', display: 'grid' }}>
        <div>Width: <input type="number" defaultValue={300} onChange={changeWidth} /></div>
        <div>Height: <input type="number" defaultValue={300} onChange={changeHeight} /></div>
        <div>Depth: <input type="number" defaultValue={10} onChange={changeDepth} /></div>
        <button onClick={() => setCurrentModel(!currentModel)}>Toggle the pre-defined product</button>
        <button onClick={() => setShowWindow(!showWindow)}>Toggle the window visibility</button>
        <button onClick={() => setShowWall(!showWall)}>Toggle the wall visibility</button>
        <button onClick={() => changeWindowColor()}>Change the window color</button>
        <button onClick={() => changeWallColor()}>Change the wall color</button>
        {/* <button >Download the scene</button> */}
      </div>
    </div>
  )
}


// const link = document.createElement('a');

// function save(blob, filename) {

//   link.href = URL.createObjectURL(blob);
//   link.download = filename;
//   link.click();

//   // URL.revokeObjectURL( url ); breaks Firefox...

// }

// function saveString(text, filename) {

//   save(new Blob([text], { type: 'text/plain' }), filename);

// }

// function saveArrayBuffer(buffer, filename) {

//   save(new Blob([buffer], { type: 'application/octet-stream' }), filename);

// }

// function exportGLTF(input) {

//   const gltfExporter = new GLTFExporter();

//   // const options = {
//   //   trs: document.getElementById('option_trs').checked,
//   //   onlyVisible: document.getElementById('option_visible').checked,
//   //   truncateDrawRange: document.getElementById('option_drawrange').checked,
//   //   binary: document.getElementById('option_binary').checked,
//   //   maxTextureSize: Number(document.getElementById('option_maxsize').value) || Infinity // To prevent NaN value
//   // };
//   gltfExporter.parse(input, function (result) {

//     if (result instanceof ArrayBuffer) {

//       saveArrayBuffer(result, 'scene.glb');

//     } else {

//       const output = JSON.stringify(result, null, 2);
//       console.log(output);
//       saveString(output, 'scene.gltf');

//     }

//   }/*, options*/);

// }


// import React, { Suspense } from "react";
// import { Canvas, useLoader } from "@react-three/fiber";
// import { OrbitControls, useTexture } from "@react-three/drei";
// import { TextureLoader } from "three/src/loaders/TextureLoader";

// import Color from './Color'
// // import "./styles.css";

// // All textures are CC0 textures from: https://cc0textures.com/
// // const name = (type) => `PavingStones092_1K_${type}.jpg`;

// function Scene() {
//   // const [
//   //   colorMap,
//   //   displacementMap,
//   //   normalMap,
//   //   roughnessMap,
//   //   aoMap
//   // ] = useLoader(TextureLoader, [
//   //   name("Color"),
//   //   name("Displacement"),
//   //   name("Normal"),
//   //   name("Roughness"),
//   //   name("AmbientOcclusion")
//   // ]);
//   // const [
//   //   colorMap,
//   //   displacementMap,
//   //   normalMap,
//   //   roughnessMap,
//   //   aoMap
//   // ] = useTexture([
//   //   name("Color"),
//   //   name("Displacement"),
//   //   name("Normal"),
//   //   name("Roughness"),
//   //   name("AmbientOcclusion")
//   // ]);
//   return (
//     <>
//       <ambientLight intensity={0.2} />
//       <directionalLight />
//       {/* <mesh>
//         <sphereBufferGeometry args={[1, 100, 100]} />
//         <meshStandardMaterial
//           displacementScale={0.2}
//           map={colorMap}
//           displacementMap={displacementMap}
//           normalMap={normalMap}
//           roughnessMap={roughnessMap}
//           aoMap={aoMap}
//         />
//       </mesh> */}
//       <Color />
//     </>
//   );
// }

// export default function App() {
//   return (
//     <div className="App">
//       <Canvas>
//         <Suspense fallback={null}>
//           <Scene />
//           <OrbitControls autoRotate />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }

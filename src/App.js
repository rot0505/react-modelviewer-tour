import React, { useState, useEffect, useRef } from 'react'
import "@google/model-viewer";

import './App.css';

function App() {

  const [width, setWidth] = useState('30')
  const [length, setLength] = useState('30')
  const [height, setHeight] = useState('10')
  const modelRef = useRef(null)

  const updateSize = () => {
    modelRef.current.scale = `${width / 30} ${length / 30} ${height / 10}`
  };

  const changeWidth = (e) => {
    setWidth(e.target.value)
  }

  const changeLength = (e) => {
    setLength(e.target.value)
  }

  const changeHeight = (e) => {
    setHeight(e.target.value)
  }

  useEffect(() => {
    updateSize()
  })

  return (
    <div className="container">
      <div className="col-80">
        <model-viewer
          alt="model-viewer"
          ref={modelRef}
          id="transform"
          transform="auto"
          loading="eager"
          camera-controls
          // auto-rotate
          scale="1 1 1"
          // poster={require(`assets/images/${product.image}`).default}
          src={require(`./assets/models/window.glb`).default}
          // alt={product.title}
          exposure={1}
          // shadow-intensity="1"
          environment-image="neutral"
        // auto
        >
        </model-viewer>
      </div>
      <div className="col-20 text-center">
        <div className="parameters">
          Width(mm): <input type="number" value={width} onChange={changeWidth} />
          Length(mm): <input type="number" value={length} onChange={changeLength} />
          Height(mm): <input type="number" value={height} onChange={changeHeight} />
        </div>
      </div>
    </div>
  );
}

export default App;

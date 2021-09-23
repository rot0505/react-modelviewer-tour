import React, { useState, useEffect, useRef } from 'react'
import "@google/model-viewer";

import './App.css';

function App() {

  const [width, setWidth] = useState('3000')
  const [length, setLength] = useState('3000')
  const [height, setHeight] = useState('100')
  const modelRef = useRef(null)

  const updateSize = () => {
    modelRef.current.scale = `${width / 3000} ${length / 3000} ${height / 100}`
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
          src={require(`./assets/models/color.glb`).default}
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

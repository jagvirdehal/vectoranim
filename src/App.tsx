import './App.css';
import React from 'react';
import { Canvas } from '@react-three/fiber';

import UI from './UI';

import Grid from './Grid';
import Lights from './Lights';
import Scene from './Scene';
import Camera from './Camera';

function App() {
  return (
    <div id="app">
      <UI />
      <Canvas id="scene">
        <Grid />
        <Lights />
        <Scene />
        <Camera />
      </Canvas>
    </div>
  );
}

export default App;

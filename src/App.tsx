import './App.css';
import React from 'react';
import { Canvas } from '@react-three/fiber';

import Grid from './Grid';
import Lights from './Lights';
import Scene from './Scene';
import Camera from './Camera';

function App() {
  return (
    <Canvas>
      <Grid />
      <Lights />
      <Scene />
      <Camera />
    </Canvas>
  );
}

export default App;

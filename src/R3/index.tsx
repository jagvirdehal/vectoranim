import './R3.css';
import React from 'react';
import { Canvas } from '@react-three/fiber';

import UI from './UI';

import Grid from './Grid';
import Lights from './Lights';
import Scene from './Scene';
import Camera from './Camera';

export default function R3() {
  return (
    <div className="r3">
      <div className="ui">
        <UI />
      </div>
      <Canvas className="scene">
        <Grid />
        <Lights />
        <Scene />
        <Camera />
      </Canvas>
    </div>
  );
}
